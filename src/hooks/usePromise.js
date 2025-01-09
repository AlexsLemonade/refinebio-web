import { useEffect, useMemo, useRef } from 'react'

export const usePromise = (condition) => {
  const resolveRef = useRef(null)
  const promise = useMemo(
    () =>
      new Promise((resolve) => {
        resolveRef.current = resolve
      }),
    []
  )

  useEffect(() => {
    if (condition) {
      resolveRef.current(condition)
    }
  }, [condition])

  return promise
}
