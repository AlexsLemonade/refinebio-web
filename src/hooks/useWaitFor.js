import { useEffect, useRef } from 'react'

export const useWaitFor = (condition) => {
  const resolveRef = useRef(null)
  const promiseRef = useRef(null)
  const latestConditionRef = useRef(condition)
  const isPromiseInitialized = useRef(false)

  const setupPromise = () => {
    if (isPromiseInitialized.current) return
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve
    })

    isPromiseInitialized.current = true
  }

  // initialize the promise when condition changes
  useEffect(() => {
    if (condition) {
      setupPromise()
      resolveRef.current()
    }

    latestConditionRef.current = condition
  }, [condition])

  return (cb) => {
    return async (...args) => {
      // ensure promise is initialized before executing callback
      if (!isPromiseInitialized.current) {
        setupPromise()
      }

      await promiseRef.current
      return cb(...args, latestConditionRef.current)
    }
  }
}
