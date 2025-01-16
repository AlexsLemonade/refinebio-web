// For legacy URLs support
import { api } from 'api'

export const Download = () => {
  return null
}

export const getServerSideProps = async ({ query: { organism } }) => {
  const getCompendia = async (quantSfOnly) => {
    const compendiaQuery = {
      latest_version: true,
      quant_sf_only: quantSfOnly
    }
    return api.compendia.get(compendiaQuery)
  }

  const getRedirect = (type) => ({
    redirect: {
      destination: `/compendia/${type}/download/${organism}`,
      permanent: true
    }
  })

  if (organism) {
    const [normalizedCompendia, rnaSeqCompendia] = await Promise.all([
      getCompendia(false),
      getCompendia(true)
    ])

    const isNormalized = normalizedCompendia.results.some(
      (c) => c.primary_organism_name === organism
    )

    const isRnaSeq = rnaSeqCompendia.results.some(
      (c) => c.primary_organism_name === organism
    )

    if (isNormalized) return getRedirect('normalized')
    if (isRnaSeq) return getRedirect('rna-seq')
  }

  return { notFound: true }
}

export default Download
