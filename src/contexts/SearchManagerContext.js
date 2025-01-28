import { createContext, useMemo, useState } from 'react'

export const SearchManagerContext = createContext({})

export const SearchManagerContextProvider = ({ children }) => {
  const [facetNames, setFacetNames] = useState([])
  const [searchParams, setSearchParams] = useState({})

  const value = useMemo(
    () => ({
      facetNames,
      setFacetNames,

      searchParams,
      setSearchParams
    }),
    [facetNames, setFacetNames, searchParams, setSearchParams]
  )

  return (
    <SearchManagerContext.Provider value={value}>
      {children}
    </SearchManagerContext.Provider>
  )
}
