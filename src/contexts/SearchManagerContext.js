import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [facetNames, setFacetNames] = useState([])
  const [search, setSearch] = useState({})
  const [filterOrders, setFilterOrders] = useState([])

  const value = useMemo(
    () => ({
      facetNames,
      setFacetNames,
      filterOrders,
      setFilterOrders,
      search,
      setSearch
    }),
    [
      facetNames,
      setFacetNames,
      filterOrders,
      setFilterOrders,
      search,
      setSearch
    ]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
