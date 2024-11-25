import { useContext, useEffect, useState } from 'react'
import { api } from 'api'
// import { options } from 'config'
import { SamplesContext } from 'contexts/SamplesContext'

export const useSamplesContext = (initialQueries, defaultConfig) => {
  const { samplesQuery, setSamplesQuery } = useContext(SamplesContext)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [samples, setSamples] = useState([])
  const hasSamples = samples?.results?.length > 0
  const totalPages = (samples && samples.count) || 0

  // fetches the table data on samplesQuery changes
  useEffect(() => {
    getSamples()
  }, [samplesQuery])

  /* Common */
  const resetPage = () => {
    samplesQuery.page = defaultConfig.page
    setSamplesQuery({ ...samplesQuery })
  }

  const updatePage = (newPage) => {
    samplesQuery.page = newPage

    updateSamplesQuery()
  }

  const restPageSize = () => {
    samplesQuery.pageSize = defaultConfig.pageSize
    setSamplesQuery({ ...samplesQuery })
  }

  const updatePageSize = (newPageSize) => {
    samplesQuery.pageSize = newPageSize

    updateSamplesQuery(true)
  }

  const resetCommonQueries = () => {
    resetPage()
    restPageSize()
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm) => {
    if (newFilterTerm === '') {
      delete samplesQuery.filterBy
    } else {
      samplesQuery.filterBy = newFilterTerm
    }

    updateSamplesQuery(true)
  }

  /* Sort Order */
  const updateSortBy = (newSortBy) => {
    if (newSortBy === '') {
      delete samplesQuery.sortBy
    } else {
      samplesQuery.sortBy = newSortBy
    }

    updateSamplesQuery(true)
  }

  /* Other */
  const getSamples = async () => {
    const params = {
      ...initialQueries,
      offset:
        (samplesQuery.page - 1) * samplesQuery.pageSize ||
        initialQueries.offset,
      limit: samplesQuery.pageSize || initialQueries.limit,
      ...(samplesQuery.datasetId ? { dataset_id: samplesQuery.datasetId } : {}),
      ...(samplesQuery.filterBy ? { filter_by: samplesQuery.filterBy } : {}),
      ...(samplesQuery.sortBy ? { ordering: samplesQuery.sortBy } : {})
    }

    setLoading(true)
    const response = await api.samples.get(params)

    if (!hasSamples) resetCommonQueries()

    setHasError(response?.ok === false)
    setSamples(response)
    setLoading(false)
  }

  const updateDatasetId = (newDatasetId) => {
    if (!newDatasetId) {
      delete samplesQuery.datasetId
    } else {
      samplesQuery.datasetId = newDatasetId
    }

    updateSamplesQuery(true)
  }

  const updateSamplesQuery = (reset = false) => {
    if (reset) resetPage()

    samplesQuery.reset = reset
    setSamplesQuery({ ...samplesQuery })
  }

  return {
    samples,
    samplesQuery,
    hasError,
    hasSamples,
    loading,
    totalPages,
    getSamples,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateDatasetId,
    updateSamplesQuery,
    updateSortBy
  }
}

export default useSamplesContext
