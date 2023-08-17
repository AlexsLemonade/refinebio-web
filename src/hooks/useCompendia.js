import { useState } from 'react'
import { useRouter } from 'next/router'
import { useToken } from 'hooks/useToken'
import { api } from 'api'
import { options } from 'config'

export const useCompendia = () => {
  const {
    compendia: { commonQueries }
  } = options
  const { push } = useRouter()
  const {
    token: tokenState,
    createToken,
    resetToken,
    validateToken
  } = useToken()
  const [compendia, setCompendia] = useState()
  const [loading, setLoading] = useState(false)

  const getCompendia = async (quantSfOnly = false) => {
    const compendiaQuery = {
      ...commonQueries,
      quant_sf_only: quantSfOnly
    }

    setLoading(true)
    const response = await api.compendia.get(compendiaQuery, tokenState)
    setCompendia(response.results)
    setLoading(false)
  }

  const downloadCompendia = async (compendiaId) => {
    const token = !validateToken()
      ? await resetToken()
      : tokenState || (await createToken())
    const response = await api.compendia.download(compendiaId, token)

    return {
      organism: response.primary_organism_name,
      url: response.computed_file.download_url
    }
  }

  const navigateToFileDownload = (organism, url) => {
    push({
      pathname: '/compendia/download',
      query: {
        organism,
        url
      }
    })
  }

  return {
    compendia,
    loading,
    downloadCompendia,
    getCompendia,
    navigateToFileDownload
  }
}
