import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [config, setConfig] = useState({})
  const [search, setSearch] = useState({})

  const value = useMemo(
    () => ({
      config,
      setConfig,
      search,
      setSearch
    }),
    [config, setConfig, search, setSearch]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
