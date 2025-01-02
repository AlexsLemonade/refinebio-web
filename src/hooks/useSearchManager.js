import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { getTranslateFacetName } from 'helpers/facetNameTranslation'
import { options } from 'config'

export const useSearchManager = () => {
  const {
    facetNames,
    setFacetNames,
    searchParams,
    setSearchParams,
    filterOrders,
    setFilterOrders
  } = useContext(SearchManagerContext)
  const {
    search: { defaultOrdering, hasPublication, numDownloadableSamples }
  } = options
  const router = useRouter()

  /* Common */
  const resetPage = () => {
    searchParams.offset = 0

    setSearchParams({ ...searchParams })
  }

  const updatePage = (newPage) => {
    searchParams.offset = (newPage - 1) * searchParams.limit

    setSearchParams({ ...searchParams })
    updateSearchQuery()
  }

  const updatePageSize = (newPageSize) => {
    searchParams.limit = newPageSize

    setSearchParams({ ...searchParams })
    updateSearchQuery(true)
  }

  const updateSortBy = (newSortOrder) => {
    if (newSortOrder === defaultOrdering) {
      delete searchParams.ordering
    } else {
      searchParams.ordering = newSortOrder
    }

    setSearchParams({ ...searchParams })
    updateSearchQuery()
  }

  /* Filters */
  // removes all the applied filters
  const clearAllFilters = () => {
    if (hasNonDownloadableSamples) {
      searchParams[numDownloadableSamples.key] = numDownloadableSamples.exclude
    }

    facetNames.forEach((rawKey) => {
      const key = getTranslateFacetName(rawKey)

      if (key in searchParams) delete searchParams[key]
    })

    updateFilterOrders(true)
    setSearchParams({ ...searchParams })
    updateSearchQuery(true)
  }

  const hasNonDownloadableSamples =
    searchParams[numDownloadableSamples.key] === numDownloadableSamples.include

  const isFilterChecked = (key, val) => {
    if (!(key in searchParams)) return false

    if (val) {
      return searchParams[key].includes(val)
    }

    return key in searchParams
  }

  const hasSelectedFacets =
    facetNames.filter((rawKey) => {
      const key = getTranslateFacetName(rawKey)
      return key in searchParams
    }).length > 0

  // toggles a filter option in facets
  const toggleFilter = (checked, option, rawKey, val, updateQuery = true) => {
    const key = getTranslateFacetName(rawKey)
    const isHasPublication = option === hasPublication.key

    if (option === numDownloadableSamples.key) {
      searchParams[option] = checked
        ? numDownloadableSamples.exclude
        : numDownloadableSamples.include
    } else if (isHasPublication) {
      if (checked) {
        searchParams[option] = hasPublication.include
      } else {
        delete searchParams[option]
      }
    } else if (checked) {
      searchParams[option] = searchParams[option]
        ? [...searchParams[option], val]
        : [val]
      addFilterOrder(key)
    } else {
      searchParams[option] = searchParams[option].filter((item) => item !== val)
      if (!searchParams[option].length) delete searchParams[option]
      removeFilterOrder(key)
    }

    updateFilterOrders()
    setSearchParams({ ...searchParams })
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
      delete searchParams.filter_order
      setFilterOrders([])
    } else {
      searchParams.filter_order = filterOrders.join(',')
    }
  }

  /* Search Term */
  const updateSearchTerm = (newSearchTerm) => {
    if (newSearchTerm === '') {
      delete searchParams.search
    } else {
      searchParams.search = newSearchTerm
    }

    setSearchParams({ ...searchParams })
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
        ...searchParams
      }
    })
  }

  return {
    facetNames,
    setFacetNames,
    searchParams,
    setSearchParams,
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
