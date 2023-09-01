import { useContext } from 'react'
import { RefinebioContext } from 'contexts/RefinebioContext'

export const useRefinebio = () => {
  const {
    dataset,
    setDataset,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    token,
    setToken
  } = useContext(RefinebioContext)

  return {
    dataset,
    setDataset,
    datasetId,
    setDatasetId,
    email,
    setEmail,
    token,
    setToken
  }
}
