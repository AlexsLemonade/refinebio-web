import { createContext, useMemo, useState } from 'react'
import { options } from 'config'

export const SamplesTableManagerContext = createContext({})

export const SamplesTableManagerContextProvider = ({ children }) => {
  const {
    samplesTable: { commonQueries, page, pageSizes }
  } = options
  const [config, setConfig] = useState({
    commonQueries,
    // the default column size
    defaultColumn: useMemo(
      () => ({ minWidth: 60, width: 160, maxWidth: 250 }),
      []
    ),
    // the default number of columns to display
    minColumns: 5,
    page,
    pageSize: pageSizes[0]
  })
  const [samplesTable, setSamplesTable] = useState({
    page,
    pageSize: pageSizes[0]
  })
  const value = useMemo(
    () => ({ config, setConfig, samplesTable, setSamplesTable }),
    [config, setConfig, samplesTable, setSamplesTable]
  )

  return (
    <SamplesTableManagerContext.Provider value={value}>
      {children}
    </SamplesTableManagerContext.Provider>
  )
}
