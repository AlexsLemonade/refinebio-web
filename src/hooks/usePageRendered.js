import { useEffect, useState } from 'react'

// Returns true when a component uses this hook is mounted
// NOTE: with server componets, this check won't be unnecessary

export const usePageRendered = () => {
  const [pageRendered, setPagetRendered] = useState(false)

  useEffect(() => {
    setPagetRendered(true)
  }, [])

  return pageRendered
}

export default usePageRendered
