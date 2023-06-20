import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import getQueryParam from 'helpers/getQueryParam'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    search: searchState,
    setSearch: setSearchState,
    config: configState,
    setConfig: setConfigState
  } = useContext(SearchManagerContext)
  const {
    search: { clientOnlyQuery, pageSizes, sortby }
  } = options
  const router = useRouter()
  const search = searchState
  const setSearch = setSearchState
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
      if (key in search.filters) delete search.filters[key]
    })

    setSearch({ ...search })
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
    if (!search.filters) return false

    return (
      (config.filterOptions || []).filter(
        (filterOption) => filterOption in search.filters
      ).length > 0
    )
  }

  const isFilterChecked = (key, val) => {
    if (!(key in search.filters)) return false

    if (val) {
      return search.filters[key].includes(val)
    }

    return key in search.filters
  }

  // toggles a filter option in facets
  const toggleFilter = (checked, key, val, updateQuery = true) => {
    if (clientOnlyQuery.includes(key)) {
      if (checked) {
        delete search.filters[key]
      } else {
        search.filters[key] = true
      }
    }
    if (!clientOnlyQuery.includes(key)) {
      if (checked) {
        if (search.filters[key] !== undefined) {
          search.filters[key].push(val)
        } else {
          search.filters[key] = [val]
        }
      } else if (search.filters[key].length > 0) {
        search.filters[key] = search.filters[key].filter((item) => item !== val)
        if (search.filters[key].length === 0) delete search.filters[key]
      }
    }

    setSearch({ ...search })
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
        ...(search.filters ? search.filters : {}),
        ...(search.search ? { search: search.search } : {}),
        ...(search.ordering ? { ordering: search.ordering } : {}),
        ...(search.p ? { p: search.p } : {}),
        ...(search.size ? { size: search.size } : {})
      }
    })
  }

  return {
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
