import { useEffect, useState } from 'react'
import { useRefinebio } from 'hooks/useRefinebio'
import { api } from 'api'
import gtag from 'analytics/gtag'

export const useDownloadCompendium = (compendium) => {
  const { acceptedTerms, tokenPromise } = useRefinebio()
  const [error, setError] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState('')

  // fetchs the download URL for the selected compendium
  useEffect(() => {
    const fetchDownloadUrl = async () => {
      const response = await api.compendia.download(
        compendium.id,
        await tokenPromise
      )
      const { ok, statusCode } = response
      setError(!ok ? statusCode : null)
      setDownloadUrl(ok ? response.computed_file.download_url : null)
    }

    if (acceptedTerms && tokenPromise) {
      fetchDownloadUrl()
    }
  }, [acceptedTerms, compendium, tokenPromise])

  // triggers the file download once the download URL is available
  useEffect(() => {
    if (downloadUrl) {
      window.open(downloadUrl, '_self')
      gtag.trackCompendiaDownload(compendium)
    }
  }, [compendium, downloadUrl])

  return {
    error,
    downloadUrl
  }
}
