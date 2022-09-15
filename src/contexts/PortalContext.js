import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const PortalContext = createContext({})

export const PortalContextProvider = ({ children }) => {
  const [email, setEmail] = useLocalStorage('refinebio-user-email', null)
  const [token, setToken] = useLocalStorage('refinebio-api-token', null)

  const value = useMemo(() => ({
    email,
    setEmail,
    token,
    setToken
  }))

  return (
    <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
  )
}
