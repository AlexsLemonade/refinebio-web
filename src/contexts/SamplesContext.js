import { createContext, useMemo, useState, useEffect } from 'react'
import { api } from 'api'

export const SamplesContext = createContext({})

export const SamplesContextProvider = ({ query: initialQuery, children }) => {
  const [response, setReponse] = useState({})
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [samplesQuery, setSamplesQuery] = useState({
    offset: 0,
    limit: 10,
    ...initialQuery
  })

  const samples = response.results || []
  const hasSamples = samples.length > 0
  const totalSamples = response.count

  const getSamples = async () => {
    setLoading(true)
    const samplesResponse = await api.samples.get(samplesQuery)
    setHasError(samplesResponse?.ok === false)
    setReponse(samplesResponse)
    setLoading(false)
  }

  useEffect(() => {
    getSamples()
  }, [samplesQuery])

  const value = useMemo(
    () => ({
      loading,
      hasError,
      samples,
      samplesQuery,
      hasSamples,
      totalSamples,
      setSamplesQuery,
      getSamples
    }),
    [
      loading,
      hasError,
      samples,
      samplesQuery,
      hasSamples,
      totalSamples,
      setSamplesQuery,
      getSamples
    ]
  )

  return (
    <SamplesContext.Provider value={value}>{children}</SamplesContext.Provider>
  )
}
