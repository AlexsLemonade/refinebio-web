import { createContext, useState, useMemo } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState({})
  const [searchTerm, setSearchTerm] = useState({})

  const value = useMemo(
    () => ({
      filters,
      setFilters,
      search,
      setSearch,
      searchTerm,
      setSearchTerm
    }),
    [filters, setFilters, search, setSearch, searchTerm, setSearchTerm]
  )
  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
