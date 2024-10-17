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

  const getPlatformNames = (samples) =>
    unionizeArrays(...samples.map((sample) => sample.pretty_platform))

  const getTechnology = (samples) =>
    unionizeArrays(...samples.map((sample) => sample.technology.toUpperCase()))

  const getExperiment = async (param) => {
    setLoading(true)
    const response = await api.experiments.get(param)
    const platformNames = getPlatformNames(response.samples)
    const technology = getTechnology(response.samples)
    // adds platform_names and technology fields from samples
    // matching experiment results in the search results
    const formattedResponse = {
      ...response,
      platform_names: platformNames,
      technology
    }

    setExperiment(formattedResponse)
    setLoading(false)
  }

  return {
    databaseNames,
    experiment,
    loading,
    hasSamples,
    getExperiment
  }
}
