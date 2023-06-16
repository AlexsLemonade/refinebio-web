import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [config, setConfig] = useState({})
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState({})

  const value = useMemo(
    () => ({
      config,
      setConfig,
      filters,
      setFilters,
      search,
      setSearch
    }),
    [config, setConfig, filters, setFilters, search, setSearch]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
