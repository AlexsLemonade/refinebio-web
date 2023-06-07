import { createContext, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [filters, setFilters] = useState({})
  const [search, setSearch] = useState({})

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    filters,
    setFilters,
    search,
    setSearch
  }

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
