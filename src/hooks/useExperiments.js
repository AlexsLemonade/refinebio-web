import { useState } from 'react'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'

export const useExperiments = () => {
  const databaseNames = {
    GEO: 'Gene Expression Omnibus (GEO)',
    SRA: 'Sequence Read Archive (SRA)',
    ARRAY_EXPRESS: 'ArrayExpress'
  }
  const [experiment, setExperiment] = useState()
  const [loading, setLoading] = useState(false)

  const getExperiment = async (param) => {
    setLoading(true)
    const response = await api.experiments.get(param)
    setExperiment(response)
    setLoading(false)
  }

  const getPlatformNames = () => {
    return unionizeArrays(
      ...experiment.samples.map((sample) => sample.pretty_platform)
    )
  }

  const getTechnologyNames = () => {
    return unionizeArrays(
      ...experiment.samples.map((sample) => sample.technology.toUpperCase())
    )
  }

  const hasSamples = () => {
    return experiment?.samples?.length > 0
  }

  return {
    databaseNames,
    experiment,
    loading,
    getExperiment,
    getPlatformNames,
    getTechnologyNames,
    hasSamples
  }
}
