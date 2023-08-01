import { useContext } from 'react'
import { DatasetContext } from 'contexts/DatasetContext'

export const useDataset = () => useContext(DatasetContext)
