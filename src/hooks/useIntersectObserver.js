import { useState, useEffect } from 'react'
// (resource) https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// Takes refs(one or more refs) and options(a second arg that needs to be passed onto the IntersectObserver API's constructor)
// Returns a state 'nodes' which includes each ref's intersection status

export const useIntersectObserver = (options, ...refs) => {
  const [nodes, setNodes] = useState({})

  const callback = (entries) => {
    const prefix = 'node'
    entries.forEach((entry, i) =>
      setNodes((prev) => ({
        ...prev,
        [`${prefix}_${i}`]: {
          boundingClientRect: entry.boundingClientRect,
          isIntersecting: entry.isIntersecting,
          target: entry.target
        }
      }))
    )
  }

  useEffect(() => {
    // create an instance of IntersectionObserver and register refs
    const observer = new IntersectionObserver(callback, options)
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return nodes
}
