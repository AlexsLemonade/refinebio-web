import { api } from 'api'
import formatURLString from 'helpers/formatURLString'

export const AccessionCode = () => {
  return null
}

export const getServerSideProps = async ({ query }) => {
  const experiment = await api.experiments.get(query.accessionCode)
  // returns 404
  if (!experiment) {
    return {
      notFound: true
    }
  }

  // redirects to the experiment page
  return {
    redirect: {
      destination: `/experiments/${experiment.accession_code}/${formatURLString(
        experiment.title
      )}`
    }
  }
}

export default AccessionCode
