import { useEffect, useState } from 'react'
import { useToken } from 'hooks/useToken'
import { api } from 'api'
import gtag from 'analytics/gtag'

export const useDownloadCompendium = (compendium) => {
  const { token, resetToken, validateToken } = useToken()
  const [error, setError] = useState(null)
  const [downloadUrl, setDownloadUrl] = useState('')

  // fetchs the download URL for the selected compendium with a valid token
  useEffect(() => {
    const fetchDownloadUrl = async () => {
      const tokenToUse = !validateToken() ? await resetToken() : token
      const response = await api.compendia.download(compendium.id, tokenToUse)
      const { ok, statusCode } = response
      setError(!ok ? statusCode : null)
      setDownloadUrl(ok ? response.computed_file.download_url : null)
    }

    fetchDownloadUrl()
  }, [compendium, token])

  // triggers the file download once the download URL is available
  useEffect(() => {
    if (downloadUrl) {
      startFileDownload()
      gtag.trackCompendiaDownload(compendium)
    }
  }, [compendium, downloadUrl])

  const startFileDownload = () => {
    if (downloadUrl) window.open(downloadUrl, '_self')
  }

  return {
    error,
    downloadUrl,
    startFileDownload
  }
}
