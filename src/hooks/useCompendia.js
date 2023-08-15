import { useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'api'
import { options } from 'config'

export const useCompendia = () => {
  const {
    compendia: { commonQueries }
  } = options
  const { push } = useRouter()
  const [compendia, setCompendia] = useState()
  const [loading, setLoading] = useState(false)
  // TEMPORARY created for this hook (remove after the useToken hook implementation)
  const tempTokenId = '3064bb92-e761-49d7-a7ac-7f7d90181576'

  const getCompendia = async (quantSfOnly = false, token = null) => {
    const compendiaQuery = {
      ...commonQueries,
      quant_sf_only: quantSfOnly
    }

    setLoading(true)
    const response = await api.compendia.get(compendiaQuery, token)
    setCompendia(response.results)
    setLoading(false)
  }

  const downloadCompendia = async (id, token) => {
    const tokenId = token || tempTokenId
    const response = await api.compendia.download(id, tokenId)

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
    tempTokenId,
    loading,
    downloadCompendia,
    getCompendia,
    navigateToFileDownload
  }
}
