import { useContext, useState } from 'react'
import { api } from 'api'
import { SamplesTableManagerContext } from 'contexts/SamplesTableManagerContext'

export const useSamplesTableManager = (queryToAdd = {}) => {
  const {
    config: configState,
    setConfig: setConfigState,
    samplesTable: samplesTableState,
    setSamplesTable: setSamplesTableState,
    samplesTableData: samplesTableDataState,
    setSamplesTableData: setSamplesTableDataState
  } = useContext(SamplesTableManagerContext)
  const config = configState
  const setConfig = setConfigState
  const samplesTable = samplesTableState
  const setSamplesTable = setSamplesTableState
  const samplesTableData = samplesTableDataState
  const setSamplesTableData = setSamplesTableDataState
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const hasSamples = samplesTableData?.results?.length > 0
  const totalPages = (samplesTableData && samplesTableData.count) || 0

  /* Common */
  const resetPage = () => {
    samplesTable.page = config.page
    setSamplesTable({ ...samplesTable })
  }

  const updatePage = (newPage) => {
    samplesTable.page = newPage

    updateSamplesTableQuery()
  }

  const restPageSize = () => {
    samplesTable.pageSize = config.pageSize
    setSamplesTable({ ...samplesTable })
  }

  const updatePageSize = (newPageSize) => {
    samplesTable.pageSize = newPageSize

    updateSamplesTableQuery(true)
  }

  const resetCommonQueries = () => {
    resetPage()
    restPageSize()
  }

  /* Filter Term */
  const updateFilterBy = (newFilterTerm) => {
    if (newFilterTerm === '') {
      delete samplesTable.filterBy
    } else {
      samplesTable.filterBy = newFilterTerm
    }

    updateSamplesTableQuery(true)
  }

  /* Sort Order */
  const updateSortBy = (newSortBy) => {
    if (newSortBy === '') {
      delete samplesTable.sortBy
    } else {
      samplesTable.sortBy = newSortBy
    }

    updateSamplesTableQuery(true)
  }

  /* Other */
  const getSamplesTableData = async () => {
    const {
      commonQueries: { offset, limit }
    } = config
    const samplesTableQuery = {
      ...queryToAdd,
      offset: (samplesTable.page - 1) * samplesTable.pageSize || offset,
      limit: samplesTable.pageSize || limit,
      ...(samplesTable.datasetId ? { dataset_id: samplesTable.datasetId } : {}),
      ...(samplesTable.filterBy ? { filter_by: samplesTable.filterBy } : {}),
      ...(samplesTable.sortBy ? { ordering: samplesTable.sortBy } : {})
    }

    setLoading(true)
    const response = await api.samples.get(samplesTableQuery)

    if (!hasSamples) resetCommonQueries()

    setHasError(response?.ok === false)
    setSamplesTableData(response)
    setLoading(false)
  }

  const updateDatasetId = (newDatasetId) => {
    if (!newDatasetId) {
      delete samplesTable.datasetId
    } else {
      samplesTable.datasetId = newDatasetId
    }

    updateSamplesTableQuery(true)
  }

  const updateSamplesTableQuery = (reset = false) => {
    if (reset) {
      resetPage()
    }

    samplesTable.reset = reset

    setSamplesTable({ ...samplesTable })
    getSamplesTableData()
  }

  return {
    config,
    setConfig,
    samplesTable,
    setSamplesTable,
    hasError,
    hasSamples,
    loading,
    samplesTableData,
    totalPages,
    getSamplesTableData,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateDatasetId,
    updateSamplesTableQuery,
    updateSortBy
  }
}

export default useSamplesTableManager
