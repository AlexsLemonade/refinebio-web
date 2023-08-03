import { useContext } from 'react'
import { FilterContext } from 'contexts/FilterContext'

export const useFilter = () => useContext(FilterContext)
