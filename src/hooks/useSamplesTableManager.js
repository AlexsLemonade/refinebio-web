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
  const totalPages = (tableData && tableData.count) || 0

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

  const updateSamplesTableQuery = () => {}

  const updateFilterBy = () => {}

  const updatePage = () => {}

  const updatePageSize = () => {}

  const updateSortBy = () => {}

  return {
    config,
    setConfig,
    samplesTable,
    setSamplesTable,
    hasSamples,
    loading,
    tableData,
    totalPages,
    getSamplesTableData,
    updateFilterBy,
    updatePage,
    updatePageSize,
    updateSamplesTableQuery,
    updateSortBy
  }
}

export default useSamplesTableManager
