import { useContext } from 'react'
import { RefinebioContext } from 'contexts/RefinebioContext'

export const useRefinebio = () => {
  const { email, setEmail, token, setToken } = useContext(RefinebioContext)

  return {
    email,
    setEmail,
    token,
    setToken
  }
}
