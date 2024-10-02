import { useContext, useState } from 'react'
import { api } from 'api'
import { SamplesTableManagerContext } from 'contexts/SamplesTableManagerContext'

export const useSamplesTableManager = (queryToAdd = {}) => {
  const { config, setConfig, samplesTable, setSamplesTable } = useContext(
    SamplesTableManagerContext
  )
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [tableData, setTableData] = useState([])
  const hasSamples = tableData?.results?.length > 0
  const totalPages = (tableData && tableData.count) || 0

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
    setTableData(response)
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
    tableData,
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
