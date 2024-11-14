import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CompendiaContext } from 'contexts/CompendiaContext'
import { useToken } from 'hooks/useToken'
import { api } from 'api'

// the server-side prop should be passed from the page component
// either compendia or compendium
export const useCompendia = (prop) => {
  const { compendia, setCompendia, type, error, setError } =
    useContext(CompendiaContext)
  const {
    push,
    query: { organism_name: organismName }
  } = useRouter()

  const { token, resetToken, validateToken } = useToken()
  const [downloadUrl, setDownloadUrl] = useState('')

  // sets the given compendia prop to compendia
  useEffect(() => {
    if (prop) setCompendia(prop)
  }, [prop])

  // fetchs the download URL for the selected compendium with the valid token
  useEffect(() => {
    if (!organismName) return

    const fetchDownloadUrl = async () => {
      const tokenToUse = !validateToken() ? await resetToken() : token
      const response = await api.compendia.download(prop.id, tokenToUse)
      const { ok, statusCode } = response
      setError(!ok ? statusCode : null)

      setDownloadUrl(ok ? response.computed_file.download_url : null)
    }

    fetchDownloadUrl(compendia)
  }, [organismName])

  const navigateToDownload = (selectedOrganism) => {
    push({
      pathname: `/compendia/${type}/download/${selectedOrganism.primary_organism_name}`
    })
  }

  return {
    error,
    compendia,
    downloadUrl,
    token,
    type,
    navigateToDownload
  }
}
