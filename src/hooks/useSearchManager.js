import { useContext } from 'react'
import { SearchManagerContext } from 'contexts/SearchManagerContext'

export const useSearchManager = (response) => {
  const { setResults } = useContext(SearchManagerContext)

  if (response) setResults(response)

  return useContext(SearchManagerContext)
}
