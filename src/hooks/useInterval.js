// (resource) vhttps://usehooks-ts.com/react-hook/use-interval

import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay = null) => {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified
    // Note: 0 is a valid value for delay
    if (!delay && delay !== 0) return null

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
    // Restarts the timer when delay changes
  }, [delay])
}
