import { createContext, useMemo, useState } from 'react'

export const BandContext = createContext({})

export const BandContextProvider = ({ children }) => {
  const [band, setBand] = useState(true)
  const value = useMemo(() => ({
    band,
    setBand
  }))

  return <BandContext.Provider value={value}>{children}</BandContext.Provider>
}
