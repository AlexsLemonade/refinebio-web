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
    setSamplesQuery((prev) => ({
      ...prev,
      page: defaultConfig.page
    }))
  }

  const updatePage = (newPage) => {
    setSamplesQuery((prev) => ({
      ...prev,
      page: newPage
    }))
  }

  const restPageSize = () => {
    setSamplesQuery((prev) => ({
      ...prev,
      pageSize: defaultConfig.pageSize
    }))
  }

  const updatePageSize = (newPageSize) => {
    setSamplesQuery((prev) => ({
      ...prev,
      pageSize: newPageSize
    }))
  }

  const resetCommonQueries = () => {
    resetPage()
    restPageSize()
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }

      if (newFilterTerm === '') {
        delete updatedQuery.filterBy
      } else {
        updatedQuery.filterBy = newFilterTerm
      }
      // reset the page on filter term change
      updatedQuery.page = defaultConfig.page

      return updatedQuery
    })
  }

  /* Sort Order */
  const updateSortBy = (newSortBy) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }

      if (newSortBy === '') {
        delete updatedQuery.sortBy
      } else {
        updatedQuery.sortBy = newSortBy
      }
      // reset the page on sorting change
      updatedQuery.page = defaultConfig.page

      return updatedQuery
    })
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
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }

      if (!newDatasetId) {
        delete updatedQuery.datasetId
      } else {
        updatedQuery.datasetId = newDatasetId
      }
      // reset the page on dataset ID change
      updatedQuery.page = defaultConfig.page

      return updatedQuery
    })
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
    updateSortBy
  }
}

export default useSamplesContext
