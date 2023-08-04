import { useCallback, useEffect, useReducer, useRef } from 'react'

// (resource) https://www.robinwieruch.de/react-hooks-fetch-data/#reducer-hook-for-data-fetching
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        hasError: false,
        error: null
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        hasError: false,
        error: null,
        data: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload
      }
    default:
      throw new Error()
  }
}

// 'fetch' is an async function that returns data
// 'dependdenccies' is a list of depedencies passed into useEffect dependency array if any
export const useLoader = (fetch, dependencies = []) => {
  // memoize the fetch
  const fetchRef = useRef(fetch)

  useEffect(() => {
    fetchRef.current = fetch
  }, [fetchRef, fetch])
  // using a reducer helps remove the `state` dependency from the effect below
  // React guarantees that `dispatch` is unique accross renders
  // (resource) https://overreacted.io/a-complete-guide-to-useeffect/#why-usereducer-is-the-cheat-mode-of-hooks
  const [state, dispatch] = useReducer(dataFetchReducer, {
    error: null,
    isLoading: true,
    data: null
  })

  const fetchDataCallback = useCallback(async () => {
    dispatch({ type: 'FETCH_INIT' })

    try {
      const data = await fetchRef.current()
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'FETCH_FAILURE', payload: error })
    }
  }, [fetchRef]) // never changes

  // useLoader will fetch Data when dependencies changes
  useEffect(() => {
    fetchDataCallback()
  }, [fetchDataCallback, ...dependencies])

  return {
    ...state,
    hasError: !!state.error,
    refresh: fetchDataCallback
  }
}
