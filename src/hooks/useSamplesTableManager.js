import { useContext, useState } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { SamplesTableManagerContext } from 'contexts/SamplesTableManagerContext'
import { api } from 'api'

export const useSamplesTableManager = (queryToAdd = {}) => {
  const { datasetId } = useRefinebio() // TEMP
  const {
    config: configState,
    setConfig: setConfigState,
    samplesTable: samplesTableState,
    setSamplesTable: setSamplesTableState
  } = useContext(SamplesTableManagerContext)
  const config = configState
  const setConfig = setConfigState
  const samplesTable = samplesTableState
  const setSamplesTable = setSamplesTableState
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [tableData, setTableData] = useState([])
  const hasSamples = tableData?.results?.length > 0
  const hasSamplesInDataset = datasetId !== null // TODO: this should check any processed samples in the dataset
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
  // TODO: finalize the implementation once the dataset manager (addSample/removeSample) is completed
  const addSample = (id) => id // TEMP

  const removeSample = (id) => id // TEMP

  const getSamplesTableData = async () => {
    const {
      commonQueries: { offset, limit }
    } = config
    const samplesTableQuery = {
      ...queryToAdd,
      offset: (samplesTable.page - 1) * samplesTable.pageSize || offset,
      limit: samplesTable.pageSize || limit,
      ...(samplesTable.filterBy ? { filter_by: samplesTable.filterBy } : {}),
      ...(samplesTable.sortBy ? { ordering: samplesTable.sortBy } : {})
    }

    setLoading(true)
    const response = await api.samples.get(samplesTableQuery)

    if (!hasSamples) resetCommonQueries()

    setHasError((response.ok && response.ok === false) || false)
    setTableData(response)
    setLoading(false)
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
    hasSamplesInDataset,
    loading,
    tableData,
    totalPages,
    addSample,
    removeSample,
    getSamplesTableData,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateSamplesTableQuery,
    updateSortBy
  }
}

export default useSamplesTableManager
