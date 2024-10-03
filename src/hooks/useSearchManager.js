import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    config: configState,
    setConfig: setConfigState,
    search: searchState,
    setSearch: setSearchState,
    filterOrders: filterOrdersState,
    setFilterOrders: setFilterOrdersState
  } = useContext(SearchManagerContext)
  const {
    search: {
      clientOnlyFilterQueries,
      commonQueries,
      formattedFacetNames,
      pageSizes,
      sortby
    }
  } = options
  const router = useRouter()
  const config = configState
  const setConfig = setConfigState
  const filterOrders = filterOrdersState
  const setFilterOrders = setFilterOrdersState
  const search = searchState
  const setSearch = setSearchState

  /* Common */
  const resetPage = () => {
    delete search.offset
    setSearch({ ...search })
  }

  const updatePage = (newPage) => {
    if (newPage === 1) {
      delete search.offset
    } else {
      search.offset =
        (newPage - 1) * (search.limit || Number(commonQueries.limit))
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  const updatePageSize = (newPageSize) => {
    if (newPageSize === pageSizes[0]) {
      delete search.limit
    } else {
      search.limit = newPageSize
    }

    setSearch({ ...search })
    updateSearchQuery(true)
  }

  const updateSortBy = (newSortOrder) => {
    if (newSortOrder === sortby[0].value) {
      delete search.sortby
    } else {
      search.sortby = newSortOrder
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  /* Filters */
  // removes all the applied filtes except for the 'empty'
  const clearAllFilters = () => {
    ;(config.filterOptions || []).forEach((key) => {
      if (key in search) delete search[key]
    })

    updateFilterOrders(true)
    setSearch({ ...search })
    updateSearchQuery(true)
  }

  // returns true if any filters that are applied, otherwise false
  const hasAppliedFilters = () => {
    if (!search) return false

    return (
      (config.filterOptions || []).filter(
        (filterOption) => filterOption in search
      ).length > 0
    )
  }

  const isFilterChecked = (key, val) => {
    if (!(key in search)) return false

    if (val) {
      return search[key].includes(val)
    }

    return key in search
  }

  // toggles a filter option in facets
  const toggleFilter = (checked, option, key, val, updateQuery = true) => {
    if (clientOnlyFilterQueries.includes(option)) {
      if (checked) {
        delete search[option]
      } else {
        search[option] = true
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (checked) {
        if (search[option] !== undefined) {
          search[option].push(val)
        } else {
          search[option] = [val]
        }
        addFilterOrder(key)
      } else {
        if (search[option].length > 0) {
          search[option] = search[option].filter((item) => item !== val)
          if (search[option].length === 0) delete search[option]
        }
        removeFilterOrder(key)
      }
    }

    updateFilterOrders()
    setSearch({ ...search })
    // skips the query update on mobile/table devices
    if (updateQuery) {
      updateSearchQuery(true)
    }
  }

  /* Filter Orders */
  const addFilterOrder = (newOrder) => {
    filterOrders.push(newOrder)
  }

  const removeFilterOrder = (orderToRemove) => {
    filterOrders.splice(filterOrders.lastIndexOf(orderToRemove), 1)
  }

  const updateFilterOrders = (clearAll = false) => {
    if (filterOrders.length === 0 || clearAll) {
      delete search.filter_order
      setFilterOrders([])
    } else {
      search.filter_order = filterOrders.join(',')
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
  // returns client-only query parameter from url
  const getSearchQueryParam = (queryParams) => {
    const temp = {}
    Object.keys(queryParams).forEach((key) => {
      if (!Object.keys(commonQueries).includes(key)) {
        if (Object.values(formattedFacetNames).includes(key)) {
          if (typeof queryParams[key] === 'string') {
            temp[key] = [queryParams[key]]
          } else {
            temp[key] = queryParams[key]
          }
        } else {
          temp[key] = queryParams[key]
        }
      }
    })

    return temp
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
        ...search
      }
    })
  }

  return {
    search,
    setSearch,
    config,
    setConfig,
    clearAllFilters,
    getSearchQueryParam,
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
