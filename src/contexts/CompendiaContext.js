import { createContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'

export const CompendiaContext = createContext({})

export const CompendiaContextProvider = ({ children }) => {
  const { query } = useRouter()

  const [compendia, setCompendia] = useState(null)
  const [type, setType] = useState('')
  const [error, setError] = useState(false)

  // updates type on tab changes
  useEffect(() => {
    if (!query) return
    setType(query.type)
  }, [query])

  const value = useMemo(
    () => ({
      compendia,
      setCompendia,
      type,
      setType,
      error,
      setError
    }),
    [compendia, setCompendia, type, setType, error, setError]
  )

  return (
    <CompendiaContext.Provider value={value}>
      {children}
    </CompendiaContext.Provider>
  )
}
