import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import { getExperimentPageData } from 'api/mockHelper'
// TEMPORARY
// endpoints:
// `v1/experiments/${accession_code}/`
// `v1/samples/experiment_accession_code=${accessionCode}`
export const getServerSideProps = ({ query }) => {
  const { accession_code: accessionCode } = query
  const { experiment } = getExperimentPageData(accessionCode)

  return { props: { accessionCode, experiment } }
}

export const Experiment = ({ accessionCode, experiment }) => {
  const router = useRouter()
  const { setResponsive } = useResponsive()

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
        <Box
          elevation="medium"
          pad={setResponsive('medium', 'large')}
          margin={{ bottom: 'basex6' }}
        >
          <Row margin={{ bottom: 'medium' }}>
            <Column>
              <Heading
                level={2}
                size="h2_small"
                margin={{ bottom: setResponsive('small', 'none') }}
              >
                Samples
              </Heading>
            </Column>
            <Column>
              <SamplesTableCTA />
            </Column>
          </Row>
          <SamplesTable
            params={{
              experiment_accession_code: accessionCode
            }}
            sampleMetadataFields={experiment.sample_metadata}
          />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(Experiment)
