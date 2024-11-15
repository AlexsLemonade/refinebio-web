import { createContext, useMemo, useState } from 'react'

export const CompendiaContext = createContext({})

export const CompendiaContextProvider = ({ children }) => {
  const [compendia, setCompendia] = useState(null)
  const [type, setType] = useState('')

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
