import { useContext } from 'react'
import { LayoutRefsContext } from 'contexts/LayoutRefsContext'

export const useLayoutRefs = () => {
  const { headerRef } = useContext(LayoutRefsContext)

  return { headerRef }
}
