import { useContext, useEffect, useRef, useState } from 'react'
import { api } from 'api'
import { SamplesContext } from 'contexts/SamplesContext'

export const useSamplesContext = (initialQueries) => {
  const { samplesQuery, setSamplesQuery } = useContext(SamplesContext)
  const prevQueryRef = useRef(samplesQuery) // previous samplesQuery reference
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [samples, setSamples] = useState([])
  const hasSamples = samples?.results?.length > 0
  const totalSamples = (samples && samples.count) || 0

  // initial fetch on page load
  useEffect(() => {
    getSamples()
  }, [])

  // refetches on samplesQuery changes
  useEffect(() => {
    if (isQueryChanged) {
      prevQueryRef.current = samplesQuery
      getSamples()
    }
  }, [samplesQuery])

  /* Common */
  const getSamples = async () => {
    const { offset, limit, datasetId, filterBy, ordering } = samplesQuery
    const params = {
      ...initialQueries,
      offset,
      limit,
      ...(datasetId ? { dataset_id: datasetId } : {}),
      ...(filterBy ? { filter_by: filterBy } : {}),
      ...(ordering ? { ordering } : {})
    }

    setLoading(true)
    const response = await api.samples.get(params)

    if (!hasSamples) resetCommonQueries()

    setHasError(response?.ok === false)
    setSamples(response)
    setLoading(false)
  }

  // detects changes in samplesQuery
  const isQueryChanged = Object.keys(samplesQuery).some(
    (key) => samplesQuery[key] !== prevQueryRef.current[key]
  )

  /* Page */
  const resetPage = () => {
    setSamplesQuery((prev) => ({
      ...prev,
      offset: initialQueries.offset
    }))
  }

  const updatePage = (newPage) => {
    setSamplesQuery((prev) => ({
      ...prev,
      offset: (newPage - 1) * samplesQuery.limit
    }))
  }

  /* Page Size */
  const restPageSize = () => {
    setSamplesQuery((prev) => ({
      ...prev,
      limit: initialQueries.limit
    }))
  }

  const updatePageSize = (newPageSize) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.limit = newPageSize
      // resets page on page size changes
      updatedQuery.offset = initialQueries.offset

      return updatedQuery
    })
  }

  const resetCommonQueries = () => {
    resetPage()
    restPageSize()
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.filterBy = newFilterTerm
      // resets page on filter changes
      updatedQuery.offset = initialQueries.offset

      return updatedQuery
    })
  }

  /* Sort Order */
  const updateSortBy = (newSortBy) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.ordering = newSortBy
      // resets page on sorting changes
      updatedQuery.offset = initialQueries.offset

      return updatedQuery
    })
  }

  /* Dataset ID */
  const updateDatasetId = (newDatasetId) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.datasetId = newDatasetId
      // resets page on dataset ID changes
      updatedQuery.offset = initialQueries.offset

      return updatedQuery
    })
  }

  return {
    samples,
    samplesQuery,
    hasError,
    hasSamples,
    loading,
    totalSamples,
    getSamples,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateDatasetId,
    updateSortBy
  }
}

export default useSamplesContext
