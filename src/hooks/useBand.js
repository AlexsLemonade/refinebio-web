import { useContext } from 'react'
import { BandContext } from 'contexts/BandContext'

export const useBand = () => useContext(BandContext)
