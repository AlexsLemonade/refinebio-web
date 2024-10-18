import { createContext, useMemo, useState } from 'react'
import { options } from 'config'

export const SamplesTableManagerContext = createContext({})

export const SamplesTableManagerContextProvider = ({ children }) => {
  const {
    samplesTable: { commonQueries, page, pageSizes }
  } = options
  const [config, setConfig] = useState({
    commonQueries,
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
