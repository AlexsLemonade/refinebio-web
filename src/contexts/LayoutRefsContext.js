import { createContext, useMemo, useRef } from 'react'

export const LayoutRefsContext = createContext()

export const LayoutRefsProvider = ({ children }) => {
  const headerRef = useRef(null)
  const value = useMemo(
    () => ({
      headerRef
    }),
    [headerRef]
  )

  return (
    <LayoutRefsContext.Provider value={value}>
      {children}
    </LayoutRefsContext.Provider>
  )
}
