import { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { options } from 'config'
import {
  getQueryParamValueWith,
  getQueryParamValueWithout
} from 'helpers/getQueryParamValue'
import parseDefaultSearchParams from 'helpers/parseDefaultSearchParams'

export const useSearchManager = () => {
  const { facetNames, setFacetNames, searchParams, setSearchParams } =
    useContext(SearchManagerContext)
  const {
    search: { numDownloadableSamples }
  } = options
  const router = useRouter()

  /* Common */
  const updatePage = (page) => {
    const offset = (page - 1) * searchParams.limit

    if (offset === searchParams.offset) return

    setSearchParams({
      ...searchParams,
      offset
    })
  }

  const updatePageSize = (limit) => {
    if (limit === searchParams.limit) return

    setSearchParams({
      ...searchParams,
      limit,
      offset: 0 // resets page on page size changes
    })
  }

  const updateSortBy = (ordering) => {
    if (ordering === searchParams.ordering) return

    setSearchParams({
      ...searchParams,
      ordering
    })
  }

  const updateSearchParam = (paramName, newValue) => {
    setSearchParams({
      ...searchParams,
      [paramName]: newValue
    })
  }

  /* Filters */
  const defaultSearchParams = useMemo(parseDefaultSearchParams, [])
  const nonFilterSearchParams = [
    'limit',
    'ordering',
    'search',
    numDownloadableSamples.key
  ]
  const keepAfterClear = nonFilterSearchParams.reduce((acc, cur) => {
    if (typeof searchParams[cur] !== 'undefined') {
      acc[cur] = searchParams[cur]
    }

    return acc
  }, {})

  const canClearFilter = Object.keys(searchParams)
    .filter((key) => !nonFilterSearchParams.includes(key))
    .some((key) => !(key in defaultSearchParams))

  const clearAllFilters = () =>
    setSearchParams(parseDefaultSearchParams(keepAfterClear))

  const isFilterChecked = (key, value) => {
    if (!(key in searchParams)) return false

    if (value) {
      return searchParams[key].includes(value)
    }

    return true
  }

  // removes a filter if the given value is undefined, otherwise adds it
  // supports three states for a boolean filter (e.g., true, false, null)
  const updateFilterValue = (filter, value) => {
    setSearchParams((prev) => {
      const updatedQuery = { ...prev }

      if (value === undefined) {
        delete updatedQuery[filter]
      } else {
        updatedQuery[filter] = value
      }

      // resets page on filter toggle
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  // toggles a facet filter and tracks its order for the API call
  // removes a filter if the given value is undefined, otherwise adds it
  const toggleFilter = (filter, value) => {
    const filterOrders = searchParams.filter_order
      ? searchParams.filter_order.split(',')
      : []

    setSearchParams((prev) => {
      const updatedQuery = { ...prev }
      const prevFilterValue = searchParams[filter]

      // adds value if not already checked, otherwise removes it
      if (!isFilterChecked(filter, value)) {
        updatedQuery[filter] = getQueryParamValueWith(prevFilterValue, value)
        // adds the filter to filter_order(client-only) for tracking
        filterOrders.push(filter)
      } else {
        updatedQuery[filter] = getQueryParamValueWithout(prevFilterValue, value)
        // removes the filter from filter_order(client-only) for tracking
        filterOrders.splice(filterOrders.lastIndexOf(filter), 1)

        if (updatedQuery[filter] === undefined) {
          delete updatedQuery[filter]
        }
      }

      // removes filter_order(client-only) if empty
      if (filterOrders.length === 0) {
        delete updatedQuery.filter_order
      } else {
        // otherwise converts to string for URL
        updatedQuery.filter_order = filterOrders.join(',')
      }

      // resets page on filter toggle
      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  /* Search Term */
  const updateSearchTerm = (search) => {
    if (search === searchParams.search) return

    setSearchParams((prev) => {
      const updatedQuery = {
        ...prev,
        search,
        offset: 0 // resets page on search term changes
      }

      if (search === '') delete updatedQuery.search
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
    canClearFilter,
    clearAllFilters,
    isFilterChecked,
    navigateToSearch,
    updateSearchParam,
    toggleFilter,
    updateFilterValue,
    updatePage,
    updatePageSize,
    updateSearchTerm,
    updateSortBy
  }
}
