import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CompendiaContext } from 'contexts/CompendiaContext'
import { useToken } from 'hooks/useToken'
import { api } from 'api'

// compendia prop is passed only from the page components
export const useCompendia = (compendiaProp) => {
  const { compendia, setCompendia, type, error, setError } =
    useContext(CompendiaContext)
  const {
    push,
    query: { organism_name: organismName }
  } = useRouter()

  const { token, resetToken, validateToken } = useToken()
  const [compendium, setCompendium] = useState()

  // sets the given compendia prop to compendia
  useEffect(() => {
    if (compendiaProp) setCompendia(compendiaProp)
  }, [compendiaProp])

  // fetchs the compedium based on the organism name from the URL query
  useEffect(() => {
    if (!compendia || !organismName) return

    const fetchCompendium = async () => {
      const compendiaId = compendia.results.find(
        (c) => c.primary_organism_name === organismName
      ).id

      const tokenToUse = !validateToken() ? await resetToken() : token
      const response = await api.compendia.download(compendiaId, tokenToUse)
      const { ok, statusCode } = response
      setError(!ok ? statusCode : null)

      if (ok) {
        setCompendium(response)
      }

      return response
    }

    fetchCompendium(compendia)
  }, [compendia, organismName])

  const navigateToDownload = (selectedOrganism) => {
    push({
      pathname: `/compendia/${type}/download/${selectedOrganism.primary_organism_name}`
    })
  }

  return {
    error,
    compendia,
    token,
    type,
    compendium,
    navigateToDownload
  }
}
