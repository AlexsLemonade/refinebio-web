import { useState } from 'react'
import unionizeArrays from 'helpers/unionizeArrays'
import { api } from 'api'
import { options } from 'config'

export const useExperiments = () => {
  const {
    experiment: { databaseNames }
  } = options

  const [experiment, setExperiment] = useState()
  const [loading, setLoading] = useState(false)
  const hasSamples = experiment?.samples?.length > 0

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

  return {
    databaseNames,
    experiment,
    loading,
    hasSamples,
    getExperiment,
    getPlatformNames,
    getTechnologyNames
  }
}
