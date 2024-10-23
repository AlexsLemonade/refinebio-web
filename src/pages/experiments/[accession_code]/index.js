import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from 'api'
import formatURLString from 'helpers/formatURLString'

// uses the query parameter 'accession code' to redirect to an experiment page with its title
export const AccessionCode = ({ experiment }) => {
  const { push } = useRouter()

  useEffect(() => {
    push(
      `/experiments/${experiment.accession_code}/${formatURLString(
        experiment.title
      )}`
    )
  }, [experiment])
}

export const getServerSideProps = async ({ query }) => {
  const response = await api.experiments.get(query.accession_code)

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: { experiment: response }
  }
}

export default AccessionCode
