import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useExperiments } from 'hooks/useExperiments'
import formatURLString from 'helpers/formatURLString'

// uses the query parameter 'accession code' to redirect to an experiment page with its title
export const AccessionCode = () => {
  const {
    query: { accession_code: accessionCode },
    isReady,
    push
  } = useRouter()

  const { experiment, getExperiment } = useExperiments()

  useEffect(() => {
    if (isReady) {
      getExperiment(accessionCode)

      if (experiment) {
        push(
          `/experiments/${accessionCode}/${formatURLString(experiment.title)}`
        )
      }
    }
  }, [isReady, experiment])
}

export default AccessionCode
