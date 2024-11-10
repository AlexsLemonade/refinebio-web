import { useRefinebio } from 'hooks/useRefinebio'
import { api } from 'api'

export const useToken = () => {
  const { token: tokenState, setToken: setTokenState } = useRefinebio()
  const token = tokenState
  const setToken = setTokenState

  const createToken = async () => {
    const { id } = await api.token.create()
    await api.token.update(id)
    setToken(id)

    return id
  }

  const getToken = async () => {
    const { id } = await api.token.get(token)
    setToken(id)

    return id
  }

  // clears the existing token and re-generate a new one
  // (e.g., in the case of a corrupted token (403))
  const resetToken = async () => {
    await setToken(null)
    const id = await createToken()

    return id
  }

  const validateToken = async () => {
    const response = await api.token.get(token)

    return response.is_activated
  }

  return {
    token,
    createToken,
    getToken,
    resetToken,
    validateToken
  }
}
