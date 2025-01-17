import { useContext } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { options } from 'config'

export const useSearchManager = () => {
  const { facetNames, setFacetNames, searchParams, setSearchParams } =
    useContext(SearchManagerContext)
  const {
    search: { hasPublication, numDownloadableSamples }
  } = options
  const router = useRouter()

  const hasNonDownloadableSamples =
    searchParams[numDownloadableSamples.key] === numDownloadableSamples.include

  const hasSelectedFacets =
    facetNames.filter((facetName) => facetName in searchParams).length > 0

  /* Common */
  const updatePage = (newPage) => {
    const newOffset = (newPage - 1) * searchParams.limit

    setSearchParams((prev) => {
      if (newOffset === prev.offset) return prev

      const updatedQuery = { ...prev }
      updatedQuery.offset = newOffset

      return updatedQuery
    })
  }

  const updatePageSize = (newPageSize) => {
    setSearchParams((prev) => {
      if (newPageSize === prev.limit) return prev

      const updatedQuery = { ...prev }
      updatedQuery.limit = newPageSize
      // resets page on page size changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  const updateSortBy = (newSortOrder) => {
    setSearchParams((prev) => {
      if (newSortOrder === prev.ordering) return prev

      const updatedQuery = { ...prev }
      updatedQuery.ordering = newSortOrder

      return updatedQuery
    })
  }

  /* Filters */
  const clearAllFilters = () => {
    setSearchParams((prev) => {
      const updatedQuery = { ...prev }

      if (hasNonDownloadableSamples) {
        updatedQuery[numDownloadableSamples.key] =
          numDownloadableSamples.exclude
      }

      facetNames.forEach((facetName) => {
        if (facetName in updatedQuery) delete updatedQuery[facetName]
      })

      delete updatedQuery.filter_order
      // resets page on filter changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  const isFilterChecked = (key, val) => {
    if (!(key in searchParams)) return false

    if (val) {
      return searchParams[key].includes(val)
    }

    return key in searchParams
  }

  // toggles a filter item in facets
  const toggleFilter = (checked, filter, selectedItem) => {
    const isHasPublication = filter === hasPublication.key

    setSearchParams((prev) => {
      const updatedQuery = { ...prev }
      const filterOrders = updatedQuery.filter_order
        ? updatedQuery.filter_order.split(',')
        : []

      if (filter === numDownloadableSamples.key) {
        updatedQuery[filter] = checked
          ? numDownloadableSamples.exclude
          : numDownloadableSamples.include
      } else if (isHasPublication) {
        if (checked) {
          updatedQuery[filter] = hasPublication.include
        } else {
          delete updatedQuery[filter]
        }
      } else if (checked) {
        updatedQuery[filter] = updatedQuery[filter]
          ? [...updatedQuery[filter], selectedItem]
          : [selectedItem]
        // adds the key to filter_order(client-only) for order tracking
        filterOrders.push(filter)
      } else {
        updatedQuery[filter] = updatedQuery[filter].filter(
          (item) => item !== selectedItem
        )

        if (!updatedQuery[filter].length) delete updatedQuery[filter]

        // removes the key from filter_order(client-only) for order tracking
        filterOrders.splice(filterOrders.lastIndexOf(filter), 1)
      }

      // if no facet selected, removes filter_order(client-only) from searchParams
      if (filterOrders.length === 0) {
        delete updatedQuery.filter_order
      } else {
        // otherwise converts filter_order(client-only) to string for URL
        updatedQuery.filter_order = filterOrders.join(',')
      }

      // resets page on on filter toggle
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  /* Search Term */
  const updateSearchTerm = (newSearchTerm) => {
    setSearchParams((prev) => {
      if (newSearchTerm === prev.search) return prev

      const updatedQuery = { ...prev }

      if (newSearchTerm !== '') {
        updatedQuery.search = newSearchTerm
      } else {
        delete updatedQuery.search
      }

      // resets page on search term changes
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  // handles search requests from non-search page and
  // navigates a user to the search page
  const navigateToSearch = (newQuery) => {
    router.push({
      pathname: '/search',
      query: newQuery && newQuery
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
    updateSearchTerm,
    updateSortBy
  }
}
