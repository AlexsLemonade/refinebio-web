import { useContext } from 'react'
import { SearchContext } from 'contexts/SearchContext'

export const useSearch = (response) => {
  const { setResults } = useContext(SearchContext)

  if (response) setResults(response)

  return useContext(SearchContext)
}
