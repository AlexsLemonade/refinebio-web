import { useContext } from 'react'
import { PortalContext } from 'contexts/PortalContext'

export const usePortal = () => useContext(PortalContext)
