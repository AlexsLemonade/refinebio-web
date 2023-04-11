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
    const options = { small, medium, large }

    return options[viewport] || medium
  }

  return {
    viewport,
    getForBreakpoint,
    setResponsive
  }
}

export default useResponsive
