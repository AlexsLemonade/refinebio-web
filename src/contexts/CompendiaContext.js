import { createContext, useEffect, useMemo, useState } from 'react'

export const CompendiaContext = createContext({})

export const CompendiaContextProvider = ({
  children,
  initialCompendia = null,
  initialType = ''
}) => {
  const [compendia, setCompendia] = useState(initialCompendia)
  const [type, setType] = useState(initialType)

  useEffect(() => {
    setCompendia(initialCompendia)
    setType(initialType)
  }, [initialCompendia, initialType])

  const value = useMemo(
    () => ({
      compendia,
      setCompendia,
      type,
      setType
    }),
    [compendia, setCompendia, type, setType]
  )

  return (
    <CompendiaContext.Provider value={value}>
      {children}
    </CompendiaContext.Provider>
  )
}
