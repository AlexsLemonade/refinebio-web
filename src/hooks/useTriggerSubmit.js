import { useEffect } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'

export const useTriggerSubmit = (trigger, onSubmit) => {
  const { token } = useRefinebio()

  useEffect(() => {
    if (trigger && token) onSubmit()
  }, [trigger, token])
}
