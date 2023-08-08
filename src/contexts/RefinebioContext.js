import { createContext, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'

export const RefinebioContext = createContext({})

export const RefinebioContextProvider = ({ children }) => {
  const [email, setEmail] = useLocalStorage('user-email', null)
  const [token, setToken] = useLocalStorage('api-token', null)

  const value = useMemo(
    () => ({
      email,
      setEmail,
      token,
      setToken
    }),
    [email, setEmail, token, setToken]
  )

  return (
    <RefinebioContext.Provider value={value}>
      {children}
    </RefinebioContext.Provider>
  )
}
