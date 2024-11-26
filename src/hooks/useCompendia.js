import { useState } from 'react'
import { useRouter } from 'next/router'
import { useToken } from 'hooks/useToken'
import { api } from 'api'

export const useCompendia = () => {
  const { push } = useRouter()
  const { token, resetToken, validateToken } = useToken()
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const getCompendia = async (type) => {
    const compendiaQuery = {
      latest_version: true,
      limit: 1000,
      quant_sf_only: type === 'rna-seq'
    }

    setLoading(true)
    const response = await api.compendia.get(compendiaQuery, token)
    setHasError(!response.ok)
    setLoading(false)

    return response
  }

  const getCompediaType = (compendia) =>
    compendia.results.some((result) => result.quant_sf_only === true)
      ? 'rna-seq'
      : 'normalized'

  const downloadCompendia = async (compendiaId) => {
    // validates the existing token or create a new one
    const tokenToUse = (await validateToken()) ? token : await resetToken()
    const response = await api.compendia.download(compendiaId, tokenToUse)

    return {
      organism: response.primary_organism_name,
      url: response.computed_file.download_url
    }
  }

  const navigateToFileDownload = async (organism, url) => {
    push({
      pathname: '/compendia/download',
      query: {
        organism,
        url
      }
    })
  }

  return {
    hasError,
    loading,
    downloadCompendia,
    getCompendia,
    getCompediaType,
    navigateToFileDownload
  }
}
