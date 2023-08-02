import { useState, useEffect } from 'react'
// (resource) https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Takes a ref and options(the second arg that needs to be passed onto the IntersectObserver API's constructor)
// Returns a state 'target' which includes the ref's intersection status

export const useIntersectObserver = (ref, options) => {
  const [target, setTarget] = useState({})

  const callback = (entries) => {
    const [entry] = entries

    setTarget({
      boundingClientRect: entry.boundingClientRect,
      isIntersecting: entry.isIntersecting,
      target: entry.target
    })
  }

  useEffect(() => {
    // create an instance of IntersectionObserver and register the ref
    const observer = new IntersectionObserver(callback, options)
    if (ref.current) observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return target
}
