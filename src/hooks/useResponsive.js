import { useContext, useEffect } from 'react'
import { ResponsiveContext } from 'grommet'

/*
  small = a phone <= 750
  medium = a tablet <= 1024 
  large = a computer >= 1025
*/

export const useResponsive = () => {
  const viewport = useContext(ResponsiveContext)

  useEffect(() => {}, [viewport])

  const setResponsive = (small, medium, large) => {
    if (!large) {
      return viewport === 'small' ? small : medium
    }

    // eslint-disable-next-line no-nested-ternary
    return viewport === 'small' ? small : viewport === 'medium' ? medium : large
  }

  return {
    viewport,
    setResponsive
  }
}

export default useResponsive
