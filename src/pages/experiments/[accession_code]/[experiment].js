import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import experimentData from 'api/mockDataExperiment'
import samplesTableData from 'api/mockDataSamplesTable'

// TEMPORARY
export const getServerSideProps = ({ query }) => {
  const { accession_code: accessionCode } = query

  let experiment
  let samples

  try {
    // e.g.) getExperiment(accessionCode)
    // endpoint: 'v1/experiments/{accession_code}/'
    experiment =
      accessionCode === 'GSE116436' ? experimentData[0] : experimentData[1]
    samples =
      accessionCode === 'GSE116436'
        ? samplesTableData[0][0]
        : samplesTableData[1][0]
  } catch (error) {
    return { error }
  }

  return { props: { experiment, samples } }
}

export const Experiment = ({ experiment, samples }) => {
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
        <Box elevation="medium" pad="large" margin={{ bottom: 'basex6' }}>
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
          <SamplesTable experiment={experiment} samples={samples} />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(Experiment)
