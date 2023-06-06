import { createContext, useState } from 'react'
import { useRouter } from 'next/router'
import isEmptyObject from 'helpers/isEmptyObject'
import { api } from 'api'
import { options } from 'config'

export const SearchContext = createContext({})

export const SearchContextProvider = ({ children }) => {
  const { pageSizes, sortby } = options
  const router = useRouter()
  const pathname = 'search'
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [sortByOption, setSortByOption] = useState(sortby[0].value)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const params = {
    limit: pageSize,
    offset: page * pageSize,
    ordering: sortByOption,
    ...(filters && filters),
    // the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
    // NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
    // with `num_downloadable_samples__gt: 0`
    ...(searchTerm ? { search: searchTerm } : ''),
    ...(!filters || !filters.empty ? { num_downloadable_samples__gt: 0 } : '')
  }

  // TEMPORARY
  const pushFilter = (newFilter) => {
    router.push({
      pathname,
      query: {
        ...(searchTerm ? { search: searchTerm } : ''),
        ...newFilter
      }
    })
  }

  const pushSearchTerm = (newSearchTerm) => {
    router.push({
      pathname,
      query: {
        ...filters,
        ...(newSearchTerm ? { search: newSearchTerm } : '')
      }
    })
  }

  const clearAllFilters = () => {
    setFilters(() => {
      const temp = {}

      // exclude the non-downloadable filter
      if (filters.empty) {
        temp.empty = filters.empty
      }

      pushFilter(temp)
      return !isEmptyObject(temp) ? temp : {}
    })
  }

  const getSearchResults = async () => {
    const result = await api.search.get(params)
    return result
  }

  // toggle each filter(checkbox) in SearchFilterList
  const toggleFilter = (e, param, val) => {
    if (e.target.checked) {
      setFilters(() => {
        const temp = { ...filters }
        if (temp[param] !== undefined) {
          temp[param].push(val)
        } else {
          temp[param] = [val]
        }
        pushFilter(temp)
        return { ...temp }
      })
    } else {
      setFilters(() => {
        const temp = { ...filters }

        if (temp[param].length > 0) {
          temp[param] = temp[param].filter((item) => item !== val)
          if (temp[param].length === 0) delete temp[param]
        }

        pushFilter(temp)
        return { ...temp }
      })
    }
  }

  return (
    <SearchContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        page,
        setPage,
        pageSize,
        setPageSize,
        params,
        filters,
        results,
        pushFilter,
        pushSearchTerm,
        setResults,
        setFilters,
        searchTerm,
        setSearchTerm,
        sortByOption,
        setSortByOption,
        clearAllFilters,
        getSearchResults,
        toggleFilter
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
