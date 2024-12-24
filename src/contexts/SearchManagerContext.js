import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [facetNames, setFacetNames] = useState([])
  const [searchParams, setSearchParams] = useState({})
  const [filterOrders, setFilterOrders] = useState([])

  const value = useMemo(
    () => ({
      facetNames,
      setFacetNames,
      filterOrders,
      setFilterOrders,
      searchParams,
      setSearchParams
    }),
    [
      facetNames,
      setFacetNames,
      filterOrders,
      setFilterOrders,
      searchParams,
      setSearchParams
    ]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
