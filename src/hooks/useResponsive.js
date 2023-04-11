import { useContext, useEffect } from 'react'
import { ResponsiveContext } from 'grommet'
import { useMatchMedia } from './useMatchMedia'

/*
  small = a phone <= 500
  medium = a tablet <= 1024 
  large = a computer >= 1025
*/

export const useResponsive = () => {
  const viewport = useContext(ResponsiveContext)

  useEffect(() => {}, [viewport])

  const getForBreakpoint = (
    width,
    smaller,
    bigger,
    mediaFeature = 'max-width',
    unit = 'px'
  ) => {
    return useMatchMedia(`(${mediaFeature}: ${width}${unit})`)
      ? smaller
      : bigger
  }

  const setResponsive = (small, medium, large) => {
    if (!large) {
      return viewport === 'small' ? small : medium
    }

    // eslint-disable-next-line no-nested-ternary
    return viewport === 'small' ? small : viewport === 'medium' ? medium : large
  }

  return {
    viewport,
    getForBreakpoint,
    setResponsive
  }
}

export default useResponsive
