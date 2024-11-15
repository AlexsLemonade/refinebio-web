import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CompendiaContext } from 'contexts/CompendiaContext'

export const useCompendiaContext = (initialCompendia, initialType) => {
  const { compendia, setCompendia, type, setType } =
    useContext(CompendiaContext)
  const { push } = useRouter()

  // sets the context states if inital states are provided
  useEffect(() => {
    if (initialCompendia) setCompendia(initialCompendia)
    if (initialType) setType(initialType)
  }, [initialCompendia, initialType])

  const goToDownloadCompendium = (compendium) => {
    push({
      pathname: `/compendia/${type}/download/${compendium.primary_organism_name}`
    })
  }

  return {
    compendia,
    type,
    goToDownloadCompendium
  }
}
