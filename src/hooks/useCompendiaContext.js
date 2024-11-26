import { useContext } from 'react'
import { useRouter } from 'next/router'
import { CompendiaContext } from 'contexts/CompendiaContext'

export const useCompendiaContext = () => {
  const { compendia, type } = useContext(CompendiaContext)
  const { push } = useRouter()

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
