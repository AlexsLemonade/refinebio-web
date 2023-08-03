// TEMPORARY
// TODO: revise the workaround for using a hook inside a callback
import { useState, useEffect } from 'react'

export const useTimeoutInCallback = (callback, delay = 0) => {
  const [timer, setTimer] = useState(null)

  const startTimer = () => {
    setTimer(setTimeout(() => callback(), delay))
  }
  const clearTimer = () => {
    setTimer(clearTimeout(timer))
  }

  useEffect(() => {
    return () => clearTimer()
  }, [])

  return { startTimer, clearTimer }
}
