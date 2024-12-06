import { useContext } from 'react'

import { SamplesContext } from 'contexts/SamplesContext'

export const useSamplesContext = () => {
  const {
    loading,
    hasError,
    samples,
    samplesQuery,
    hasSamples,
    totalSamples,
    setSamplesQuery,
    getSamples
  } = useContext(SamplesContext)

  /* Page */
  const updatePage = (newPage) => {
    const newOffset = (newPage - 1) * samplesQuery.limit

    setSamplesQuery((prev) => {
      if (newOffset === prev.offset) return prev

      const updatedQuery = { ...prev }
      updatedQuery.offset = newOffset

      return updatedQuery
    })
  }

  /* Page Size */
  const updatePageSize = (newPageSize) => {
    setSamplesQuery((prev) => {
      if (newPageSize === prev.limit) return prev

      const updatedQuery = { ...prev }
      updatedQuery.limit = newPageSize
      // resets page on page size changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm) => {
    setSamplesQuery((prev) => {
      if (newFilterTerm === prev.filter_by) return prev

      const updatedQuery = { ...prev }

      if (newFilterTerm) {
        updatedQuery.filter_by = newFilterTerm
      } else {
        delete updatedQuery.filter_by
      }
      // resets page on filter changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  /* Sort Order */
  const updateSortBy = (newSortBy) => {
    setSamplesQuery((prev) => {
      if (newSortBy !== prev.ordering) return prev

      const updatedQuery = { ...prev }

      if (newSortBy) {
        updatedQuery.ordering = newSortBy
      } else {
        delete updatedQuery.ordering
      }

      return updatedQuery
    })
  }

  /* Dataset ID */
  const updateDatasetId = (newDatasetId) => {
    setSamplesQuery((prev) => {
      const updatedQuery = { ...prev }

      if (newDatasetId) {
        updatedQuery.dataset_id = newDatasetId
      } else {
        delete updatedQuery.dataset_id
      }
      // resets page on dataset ID changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  return {
    loading,
    hasError,
    samples,
    samplesQuery,
    hasSamples,
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
