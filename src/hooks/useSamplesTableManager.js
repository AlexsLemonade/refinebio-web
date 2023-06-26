import { useContext, useState } from 'react'
import { SamplesTableManagerContext } from 'contexts/SamplesTableManagerContext'
import { api } from 'api'

export const useSamplesTableManager = (queryToAdd = {}) => {
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
  const [tableData, setTableData] = useState([])
  const hasSamples = tableData?.results?.length > 0
  const hasSamplesInDataset = tableData?.results?.length > 0 // TEMP
  const totalPages = (tableData && tableData.count) || 0

  /* Common */
  const updatePage = (newPage) => {
    samplesTable.page = newPage

    updateSamplesTableQuery()
  }

  const updatePageSize = () => {}

  /* Filter Term */
  const updateFilterBy = () => {}

  /* Sort Order */
  const updateSortBy = () => {}

  /* Other */
  // TEMP
  const addSample = (id) => id

  const removeSample = (id) => id

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
    setTableData(response)
    setLoading(false)
  }

  const updateSamplesTableQuery = (reset = false) => {
    if (reset) {
      samplesTable.page = config.page
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
