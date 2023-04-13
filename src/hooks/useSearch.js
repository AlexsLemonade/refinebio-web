import { useContext } from 'react'
import { SearchContext } from 'contexts/SearchContext'

export const useSearch = () => useContext(SearchContext)
