import { useContext, useEffect, useRef, useState } from 'react'
import { api } from 'api'
import { SamplesContext } from 'contexts/SamplesContext'
import filterNullFromObject from 'helpers/filterNullFromObject'

export const useSamplesContext = (initialQuery) => {
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
    const params = {
      ...initialQuery,
      ...filterNullFromObject(samplesQuery)
    }

    setLoading(true)
    const response = await api.samples.get(params)

    // resets the page and the page size if no samples
    if (!hasSamples) {
      updatePage()
      updatePageSize()
    }

    setHasError(response?.ok === false)
    setSamples(response)
    setLoading(false)
  }

  // detects changes in samplesQuery
  const isQueryChanged = Object.keys(samplesQuery).some(
    (key) => samplesQuery[key] !== prevQueryRef.current[key]
  )

  /* Page */
  const updatePage = (newPage = 1) => {
    setSamplesQuery((prev) => ({
      ...prev,
      offset: (newPage - 1) * samplesQuery.limit
    }))
  }

  /* Page Size */
  const updatePageSize = (newPageSize = initialQuery.limit || 10) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.limit = newPageSize
      // resets page on page size changes
      updatedQuery.offset = initialQuery.offset

      return updatedQuery
    })
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm = null) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.filter_by = newFilterTerm
      // resets page on filter changes
      updatedQuery.offset = initialQuery.offset

      return updatedQuery
    })
  }

  /* Sort Order */
  const updateSortBy = (newSortBy = null) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.ordering = newSortBy
      // resets page on sorting changes
      updatedQuery.offset = initialQuery.offset

      return updatedQuery
    })
  }

  /* Dataset ID */
  const updateDatasetId = (newDatasetId = null) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }
      updatedQuery.dataset_id = newDatasetId
      // resets page on dataset ID changes
      updatedQuery.offset = initialQuery.offset

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
