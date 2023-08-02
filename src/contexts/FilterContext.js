import { createContext, useMemo, useState } from 'react'

export const FilterContext = createContext({})

export const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState({})

  const clearAllFilter = () => {
    setFilter({})
  }

  // toggle each filter(checkbox) in SearchFilterList
  const toggleFilter = (e, param, val) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }
        if (temp[param] !== undefined) {
          temp[param].push(val)
        } else {
          temp[param] = [val]
        }

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        if (temp[param].length > 0) {
          temp[param] = temp[param].filter((item) => item !== val)
          if (temp[param].length === 0) delete temp[param]
        }

        return { ...temp }
      })
    }
  }

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      clearAllFilter,
      toggleFilter
    }),
    [filter, setFilter, clearAllFilter, toggleFilter]
  )

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  )
}
