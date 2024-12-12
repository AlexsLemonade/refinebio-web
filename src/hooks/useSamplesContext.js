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
    setSamplesQuery
  } = useContext(SamplesContext)

  const refreshSamples = () => {
    setSamplesQuery({ ...samplesQuery })
  }

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

  const getSamplesMetadata = () => {
    const metadataKeys = [
      'age',
      'cell_line',
      'compound',
      'developmental_stage',
      'disease',
      'disease_stage',
      'genetic_information',
      'race',
      'sex',
      'specimen_part',
      'subject',
      'treatment'
    ]

    return metadataKeys.filter((k) =>
      samples.some((s) => s[k] !== '' && s[k] !== null)
    )
  }

  const getExperimentAccessionCodes = (dataset) => {
    const {
      experiment_accession_code: experimentAccessionCode,
      organism__name: organismName
    } = samplesQuery

    return experimentAccessionCode
      ? [experimentAccessionCode]
      : dataset.experiments
          .filter((e) => e.organism_names.includes(organismName))
          .map((e) => e.accession_code)
  }

  return {
    loading,
    hasError,
    samples,
    samplesQuery,
    hasSamples,
    totalSamples,
    getExperimentAccessionCodes,
    getSamplesMetadata,
    refreshSamples,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateDatasetId,
    updateSortBy
  }
}

export default useSamplesContext
