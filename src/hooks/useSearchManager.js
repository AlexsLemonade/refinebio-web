import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { getTranslateFacetName } from 'helpers/facetNameTranslation'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    facetNames,
    setFacetNames,
    search: searchState,
    setSearch: setSearchState,
    filterOrders: filterOrdersState,
    setFilterOrders: setFilterOrdersState
  } = useContext(SearchManagerContext)
  const {
    search: { defaultOrdering, hasPublication, numDownloadableSamples }
  } = options
  const router = useRouter()
  const filterOrders = filterOrdersState
  const setFilterOrders = setFilterOrdersState
  const search = searchState
  const setSearch = setSearchState

  /* Common */
  const resetPage = () => {
    search.offset = 0

    setSearch({ ...search })
  }

  const updatePage = (newPage) => {
    search.offset = (newPage - 1) * search.limit

    setSearch({ ...search })
    updateSearchQuery()
  }

  const updatePageSize = (newPageSize) => {
    search.limit = newPageSize

    setSearch({ ...search })
    updateSearchQuery(true)
  }

  const updateSortBy = (newSortOrder) => {
    if (newSortOrder === defaultOrdering) {
      delete search.ordering
    } else {
      search.ordering = newSortOrder
    }

    setSearch({ ...search })
    updateSearchQuery()
  }

  /* Filters */
  // removes all the applied filters
  const clearAllFilters = () => {
    if (hasNonDownloadableSamples) {
      search[numDownloadableSamples.key] = numDownloadableSamples.exclude
    }

    facetNames.forEach((rawKey) => {
      const key = getTranslateFacetName(rawKey)

      if (key in search) delete search[key]
    })

    updateFilterOrders(true)
    setSearch({ ...search })
    updateSearchQuery(true)
  }

  const hasNonDownloadableSamples =
    Number(search[numDownloadableSamples.key]) ===
    numDownloadableSamples.include

  const isFilterChecked = (key, val) => {
    if (!(key in search)) return false

    if (val) {
      return search[key].includes(val)
    }

    return key in search
  }

  const hasSelectedFacets =
    facetNames.filter((rawKey) => {
      const key = getTranslateFacetName(rawKey)
      return key in search
    }).length > 0

  // toggles a filter option in facets
  const toggleFilter = (checked, option, facetKey, val, updateQuery = true) => {
    const key = getTranslateFacetName(facetKey)
    const isHasPublication = option === hasPublication.key

    if (option === numDownloadableSamples.key) {
      search[option] = checked
        ? numDownloadableSamples.exclude
        : numDownloadableSamples.include
    } else if (isHasPublication) {
      if (checked) {
        search[option] = hasPublication.include
      } else {
        delete search[option]
      }
    } else if (checked) {
      search[option] = search[option] ? [...search[option], val] : [val]
      addFilterOrder(key)
    } else {
      search[option] = search[option].filter((item) => item !== val)
      if (!search[option].length) delete search[option]
      removeFilterOrder(key)
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
    facetNames,
    setFacetNames,
    search,
    setSearch,
    clearAllFilters,
    hasNonDownloadableSamples,
    hasSelectedFacets,
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
