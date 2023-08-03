import { useState, useEffect } from 'react'
import isWindow from 'helpers/isWindow'

// Returns true if the document currently matches the mediaQuery, otherwise false
// e.g.) useMatchMedia('(max-width: 600px)')
// (resource) https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList

export const useMatchMedia = (mediaQueryString = '') => {
  if (!isWindow) return null

  const media = window.matchMedia(mediaQueryString)
  const [matches, setMatches] = useState(media.matches)
  const changeHandler = (e) => {
    if (media.matches !== matches) setMatches(e.matches)
  }

  useEffect(() => {
    media.addEventListener('change', changeHandler)

    return () => media.removeEventListener('change', changeHandler)
  }, [media, setMatches])

  return matches
}
