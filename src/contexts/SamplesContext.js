import { createContext, useMemo, useState } from 'react'

export const SamplesContext = createContext({})

export const SamplesContextProvider = ({ children }) => {
  const [samplesQuery, setSamplesQuery] = useState({
    // default, unless overridden by caller
    offset: 0,
    limit: 10
  })

  const value = useMemo(
    () => ({ samplesQuery, setSamplesQuery }),
    [samplesQuery, setSamplesQuery]
  )

  return (
    <SamplesContext.Provider value={value}>{children}</SamplesContext.Provider>
  )
}
