import { useContext } from 'react'
import { SampleDebugContext } from 'contexts/SampleDebugContext'

export const useSampleDebug = () => useContext(SampleDebugContext)
