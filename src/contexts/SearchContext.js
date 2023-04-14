import { createContext, useState } from 'react'
import { useRouter } from 'next/router'
import isEmptyObject from 'helpers/isEmptyObject'
import { api } from 'api'
import { options } from 'config'

export const SearchContext = createContext({})

export const SearchContextProvider = ({ children }) => {
  const router = useRouter()
  const pathname = 'search'
  const pageSizes = [10, 20, 50]
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [sortByOption, setSortByOption] = useState(options.sortby[0].value)
  const [filter, setFilter] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const params = {
    limit: pageSize,
    offset: page * pageSize,
    ordering: sortByOption,
    ...(filter && filter),
    // the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
    // NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
    // with `num_downloadable_samples__gt: 0`
    ...(searchTerm ? { search: searchTerm } : ''),
    ...(!filter || !filter.empty ? { num_downloadable_samples__gt: 0 } : '')
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
        ...filter,
        ...(newSearchTerm ? { search: newSearchTerm } : '')
      }
    })
  }

  const clearAllFilter = () => {
    setFilter(() => {
      const temp = {}

      // exclude the non-downloadable filter
      if (filter.empty) {
        temp.empty = filter.empty
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
      setFilter(() => {
        const temp = { ...filter }
        if (temp[param] !== undefined) {
          temp[param].push(val)
        } else {
          temp[param] = [val]
        }
        pushFilter(temp)
        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

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
        pageSizes,
        params,
        filter,
        results,
        pushFilter,
        pushSearchTerm,
        setResults,
        setFilter,
        searchTerm,
        setSearchTerm,
        sortByOption,
        setSortByOption,
        clearAllFilter,
        getSearchResults,
        toggleFilter
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
