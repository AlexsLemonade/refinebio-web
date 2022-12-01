import { useState, useEffect } from 'react'

// returns true if the document currently matches the mediaQuery, otherwise false
// (resource) https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList

export const useMatchMedia = (mediaQueryString = '') => {
  const isWindow = typeof window !== 'undefined'

  const media = isWindow && window.matchMedia(mediaQueryString)
  const [matches, setMatches] = useState(media.matches)
  const changeHandler = (e) => setMatches(e.matches)

  useEffect(() => {
    media.addEventListener('change', changeHandler)

    return () => media.removeEventListener('change', changeHandler)
  }, [media])

  return matches
}
