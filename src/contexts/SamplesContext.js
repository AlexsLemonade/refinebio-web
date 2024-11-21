import { createContext, useMemo, useState } from 'react'
import { options } from 'config'

export const SamplesContext = createContext({})

export const SamplesContextProvider = ({ children }) => {
  const {
    pageSizes,
    samplesTable: { commonQueries, page }
  } = options
  const [config, setConfig] = useState({
    commonQueries,
    page,
    pageSize: pageSizes[0]
  })
  const [samplesQuery, setSamplesQuery] = useState({
    page,
    pageSize: pageSizes[0]
  })
  const value = useMemo(
    () => ({ config, setConfig, samplesQuery, setSamplesQuery }),
    [config, setConfig, samplesQuery, setSamplesQuery]
  )

  return (
    <SamplesContext.Provider value={value}>{children}</SamplesContext.Provider>
  )
}
