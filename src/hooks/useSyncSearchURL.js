import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSearchManager } from 'hooks/useSearchManager'

export const useSyncSearchURL = (query) => {
  const router = useRouter()
  const { searchParams } = useSearchManager()
  const hasMounted = useRef(false)

  useEffect(() => {
    // skips URL sync on initial render to avoid fetching default values
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    const currentSearchParams = new URLSearchParams(searchParams).toString()
    const currentQuery = new URLSearchParams(query).toString()
    // only updates URL if search parameters have changed
    if (currentSearchParams !== currentQuery) {
      router.push({
        pathname: router.pathname,
        query: searchParams
      })
    }
  }, [searchParams])
}
