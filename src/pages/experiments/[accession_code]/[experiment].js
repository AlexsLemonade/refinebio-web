import { memo } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SamplesTable } from 'components/SamplesTable'
import { getExperimentPageData } from 'api/mockHelper'
// TEMPORARY
// endpoints:
// `v1/experiments/${accession_code}/`
// `v1/samples/experiment_accession_code=${accessionCode}`
export const getServerSideProps = ({ query }) => {
  const { accession_code: accessionCode } = query
  const { experiment, samples } = getExperimentPageData(accessionCode)

  return { props: { accessionCode, experiment, samples } }
}

export const Experiment = ({ accessionCode, experiment, samples }) => {
  const router = useRouter()

  return (
    <Box>
      <FixedContainer pad="large">
        <Button
          label="Back to Results"
          secondary
          responsive
          onClick={() => {
            router.back()
          }}
        />
      </FixedContainer>
      <FixedContainer>
        {/* TEMPORARY: START */}
        <Box
          align="center"
          elevation="medium"
          justify="center"
          pad="large"
          margin={{ bottom: 'basex6' }}
          height="800px"
        >
          Experiment's Submitter Supplied Information goes here
        </Box>
        {/* TEMPORARY: END */}
      </FixedContainer>
      <FixedContainer>
        <SamplesTable
          accessionCode={accessionCode}
          experiment={experiment}
          samples={samples}
        />
      </FixedContainer>
    </Box>
  )
}

export default memo(Experiment)
