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
    setFilters: setFiltersState,
    config: configState,
    setConfig: setConfigState
  } = useContext(SearchManagerContext)
  const {
    search: { clientOnlyQuery, pageSizes, sortby }
  } = options
  const router = useRouter()
  const search = searchState
  const setSearch = setSearchState
  const filters = filtersState
  const setFilters = setFiltersState
  const config = configState
  const setConfig = setConfigState

  /* Common */
  const resetPage = () => {
    delete search.p
    setSearch({ ...search })
  }

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
    updateSearchQuery(true)
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
  // removes all the applied filtes except for the 'empty'
  const clearAllFilters = () => {
    ;(config.filterOptions || []).forEach((key) => {
      if (key in filters) delete filters[key]
    })

    setFilters({ ...filters })
    updateSearchQuery(true)
  }

  // returns filters-only query parameters from url
  const getFilterQueryParam = (query, facets) => {
    const queryParam = getQueryParam(query)
    const temp = {}

    Object.keys(queryParam).forEach((key) => {
      if ([...facets, ...clientOnlyQuery].includes(key)) {
        temp[key] = queryParam[key]
      }
    })

    return temp
  }

  // returns true if any filters are applied, otherwise false
  const hasAppliedFilters = () => {
    if (!filters) return false

    return (
      (config.filterOptions || []).filter(
        (filterOption) => filterOption in filters
      ).length > 0
    )
  }

  const isFilterChecked = (key, val) => {
    if (!(key in filters)) return false

    if (val) {
      return filters[key].includes(val)
    }

    return key in filters
  }

  // toggles a filter option in facets
  const toggleFilter = (checked, key, val, updateQuery = true) => {
    if (clientOnlyQuery.includes(key)) {
      if (checked) {
        delete filters[key]
      } else {
        filters[key] = true
      }
    }
    if (!clientOnlyQuery.includes(key)) {
      if (checked) {
        if (filters[key] !== undefined) {
          filters[key].push(val)
        } else {
          filters[key] = [val]
        }
      } else if (filters[key].length > 0) {
        filters[key] = filters[key].filter((item) => item !== val)
        if (filters[key].length === 0) delete filters[key]
      }
    }

    setFilters({ ...filters })
    // skips the query update on mobile/table devices
    if (updateQuery) {
      updateSearchQuery(true)
    }
  }

  /* Search Term */
  const updateSearchTerm = (newSearchTerm) => {
    if (newSearchTerm === '') {
      delete search.search
    } else {
      search.search = newSearchTerm
    }

    setSearch({ ...search })
    updateSearchQuery(true)
  }

  /* Other */
  // converts the facets to API supported format
  const formatFacetNames = (facetNames) => {
    const formattedNames = []

    for (const name of facetNames) {
      if (name === 'downloadable_organism_names') {
        formattedNames.push('downloadable_organism')
      } else if (name === 'platform_accession_codes') {
        formattedNames.push('platform')
      } else {
        formattedNames.push(name)
      }
    }

    return formattedNames
  }

  // handles search requests from non-search page and
  // navigates a user to the search page
  const navigateToSearch = (newQuery) => {
    router.push({
      pathname: '/search',
      query: newQuery && newQuery
    })
  }

  // updates URL query string
  const updateSearchQuery = (reset = false) => {
    if (reset) {
      resetPage()
    }

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
    config,
    setConfig,
    clearAllFilters,
    formatFacetNames,
    getFilterQueryParam,
    hasAppliedFilters,
    isFilterChecked,
    navigateToSearch,
    toggleFilter,
    updatePage,
    updatePageSize,
    updateSearchQuery,
    updateSearchTerm,
    updateSortBy
  }
}
