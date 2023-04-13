import { createContext, useMemo, useState } from 'react'
// import { useRouter } from 'next/router'
import isEmptyObject from 'helpers/isEmptyObject'
import { api } from 'api'

export const SearchContext = createContext({})

export const SearchContextProvider = ({ children }) => {
  // const router = useRouter()
  const [filter, setFilter] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const clearAllFilter = () => {
    setFilter(() => {
      const temp = {}

      // exclude the non-downloadable filter
      if (filter.empty) {
        temp.empty = filter.empty
      }

      return !isEmptyObject(temp) ? temp : {}
    })
  }

  const getSearchResults = async (params) => {
    const result = await api.search.get(params)

    return result
  }

  // toggle each filter(checkbox) in SearchFilterList
  const toggleFilter = (e, param, val) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }
        if (temp[param] !== undefined) {
          temp[param].push(val)
        } else {
          temp[param] = [val]
        }

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        if (temp[param].length > 0) {
          temp[param] = temp[param].filter((item) => item !== val)
          if (temp[param].length === 0) delete temp[param]
        }

        return { ...temp }
      })
    }
  }

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      searchTerm,
      setSearchTerm,
      clearAllFilter,
      getSearchResults,
      toggleFilter
    }),
    [filter, setFilter, clearAllFilter, getSearchResults, toggleFilter]
  )

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
