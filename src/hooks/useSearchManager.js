import { useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { SearchManagerContext } from 'contexts/SearchManagerContext'
import { options } from 'config'
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

  // resets page on page size changes
  const updatePageSize = (limit) => {
    if (limit === searchParams.limit) return

    setSearchParams({
      ...searchParams,
      limit,
      offset: 0
    })
  }

  const updateSortBy = (ordering) => {
    if (ordering === searchParams.ordering) return

    setSearchParams({
      ...searchParams,
      ordering
    })
  }

  // update a single parameter value
  const updateParamValue = (paramName, newValue) => {
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

  const isFilterChecked = (key, val) => {
    if (!(key in searchParams)) return false

    if (val) {
      return searchParams[key].includes(val)
    }

    return true
  }

  // toggles a filter in facets
  // resets page on filter toggle
  const toggleFilter = (filter, selectedValue) => {
    const isBooleanValue = typeof selectedValue === 'boolean'

    setSearchParams((prev) => {
      const updatedQuery = { ...prev }
      const filterOrders = updatedQuery.filter_order
        ? updatedQuery.filter_order.split(',')
        : []

      // handles boolean values - sets if true, set, otherwise remove
      if (isBooleanValue) {
        if (selectedValue) {
          updatedQuery[filter] = selectedValue
        } else {
          delete updatedQuery[filter]
        }
      } else {
        const filterValues = updatedQuery[filter] || []
        // adds selectedValue if not checked, otherwise removes it
        if (!isFilterChecked(filter, selectedValue)) {
          updatedQuery[filter] = [...filterValues, selectedValue]
          filterOrders.push(filter)
        } else {
          updatedQuery[filter] = filterValues.filter(
            (item) => item !== selectedValue
          )
          if (!updatedQuery[filter].length) delete updatedQuery[filter]
          // removes the key from filter_order(client-only) for order tracking
          filterOrders.splice(filterOrders.lastIndexOf(filter), 1)
        }
      }
      // if no facet selected, removes filter_order(client-only) from searchParams
      // otherwise converts filter_order(client-only) to string for URL
      updatedQuery.filter_order = filterOrders.length
        ? filterOrders.join(',')
        : delete updatedQuery.filter_order

      updatedQuery.offset = 0

      return updatedQuery
    })
  }

  /* Search Term */
  // resets page on search term changes
  const updateSearchTerm = (search) => {
    if (search === searchParams.search) return

    setSearchParams((prev) => {
      const updatedQuery = { ...prev, search, offset: 0 }

      if (search === '') {
        delete updatedQuery.search
      }

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
    updateParamValue,
    toggleFilter,
    updatePage,
    updatePageSize,
    updateSearchTerm,
    updateSortBy
  }
}
