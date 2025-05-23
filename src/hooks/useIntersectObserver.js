import { useState, useEffect } from 'react'
// (resource) https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Takes a ref and options(the second arg that needs to be passed onto the IntersectObserver API's constructor)
// Returns a state 'target' which includes the ref's intersection status

export const useIntersectObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const callback = (entries) => {
      const [entry] = entries
      setIsIntersecting(entry.isIntersecting)
    }

    const observer = new IntersectionObserver(callback, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}
