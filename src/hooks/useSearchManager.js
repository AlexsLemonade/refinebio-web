import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import getQueryParam from 'helpers/getQueryParam'
import isEmptyObject from 'helpers/isEmptyObject'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    search: searchState,
    setSearch: setSearchState,
    filters: filtersState,
    setFilters: setFiltersState
  } = useContext(SearchManagerContext)
  const router = useRouter()
  const search = searchState
  const setSearch = setSearchState
  const filters = filtersState
  const setFilters = setFiltersState
  const { pageSizes, sortby } = options

  /* Common */
  const updatePage = (newPage) => {
    if (newPage === 1) {
      delete search.p
    } else {
      search.p = newPage
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  const updatePageSize = (newPageSize) => {
    if (newPageSize === pageSizes[0]) {
      delete search.size
    } else {
      search.size = newPageSize
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  const updateSortBy = (newSortOrder) => {
    if (newSortOrder === sortby[0].value) {
      delete search.ordering
    } else {
      search.ordering = newSortOrder
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  /* Filters */
  const clearAllFilters = () => {
    Object.keys(filters).forEach((key) => {
      // exclude the non-downloadable filter option to be removed
      if (key === 'empty') {
        filters.empty = filters[key]
      } else {
        delete filters[key]
      }
    })

    setFilters({ ...filters })
    updateSearchQuery()
  }

  // returns filters-only query parameters from url
  const getFilterQueryParam = (query) => {
    const queryParam = getQueryParam(query)
    const list = [
      'downloadable_organism',
      'technology',
      'platform',
      'empty',
      'has_publication'
    ]
    const temp = {}
    Object.keys(queryParam).forEach((key) => {
      if (list.includes(key)) {
        temp[key] = queryParam[key]
      }
    })

    return temp
  }

  const isFilterChecked = (filter, param, value) => {
    if (!filter) return null

    if (value) {
      return filter[param] ? filter[param].includes(value) : false
    }

    return param in filter
  }

  // toggle a filter option in facets
  const toggleFilter = (e, param, val) => {
    if (e.target.checked) {
      if (filters[param] !== undefined) {
        filters[param].push(val)
      } else {
        filters[param] = [val]
      }
    } else if (filters[param].length > 0) {
      filters[param] = filters[param].filter((item) => item !== val)
      if (filters[param].length === 0) delete filters[param]
    }

    setFilters({ ...filters })
    updateSearchQuery()
  }

  const toggleNonDownloadableFilter = (e, param) => {
    if (e.target.checked) {
      delete filters[param]
    } else {
      filters[param] = true
    }

    setFilters({ ...filters })
    updateSearchQuery()
  }

  /* Search Term */
  const updateSearchTerm = (newSearchTerm) => {
    if (newSearchTerm === '') {
      delete search.search
    } else {
      search.search = newSearchTerm
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  /* Other */
  // update URL query string
  const updateSearchQuery = () => {
    router.push({
      query: {
        ...(!isEmptyObject(filters) ? filters : {}),
        ...(search.search ? { search: search.search } : {}),
        ...(search.ordering ? { ordering: search.ordering } : {}),
        ...(search.p ? { p: search.p } : {}),
        ...(search.size ? { size: search.size } : {})
      }
    })
  }

  return {
    filters,
    setFilters,
    search,
    setSearch,
    clearAllFilters,
    getFilterQueryParam,
    isFilterChecked,
    toggleFilter,
    toggleNonDownloadableFilter,
    updatePage,
    updatePageSize,
    updateSearchQuery,
    updateSearchTerm,
    updateSortBy
  }
}
