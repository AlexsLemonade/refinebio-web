import { useContext } from 'react'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    search: searchState,
    setSearch: setSearchState,
    filters: filtersState,
    setFilters: setFiltersState
  } = useContext(SearchManagerContext)
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

  /* Other */
  // update URL query string to keep it in sync with user-requesed query
  const updateSearchQuery = () => {}

  return {
    filters,
    setFilters,
    search,
    setSearch,
    clearAllFilters,
    toggleFilter,
    toggleNonDownloadableFilter,
    updatePage,
    updatePageSize,
    updateSortBy
  }
}
