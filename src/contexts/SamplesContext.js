import { createContext, useMemo, useState, useEffect } from 'react'
import { api } from 'api'
import { useDatasetManager } from 'hooks/useDatasetManager'

export const SamplesContext = createContext({})

export const SamplesContextProvider = ({ query: initialQuery, children }) => {
  const { dataset } = useDatasetManager()
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

  useEffect(() => {
    const fetchSamples = async () => {
      setLoading(true)
      const samplesResponse = await api.samples.get(samplesQuery)
      setHasError(samplesResponse?.ok === false)
      setReponse(samplesResponse)
      setLoading(false)
    }

    fetchSamples()
  }, [dataset?.data, samplesQuery]) // if My Dataset exists, refetch samples on change

  const value = useMemo(
    () => ({
      loading,
      hasError,
      samples,
      samplesQuery,
      hasSamples,
      totalSamples,
      setSamplesQuery
    }),
    [
      loading,
      hasError,
      samples,
      samplesQuery,
      hasSamples,
      totalSamples,
      setSamplesQuery
    ]
  )

  return (
    <SamplesContext.Provider value={value}>{children}</SamplesContext.Provider>
  )
}
