import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import experimentMock from 'api/mockDataExperiment'
import samplesTableMock from 'api/mockDataSamplesTable'

// TEMPORARY
export const getServerSideProps = ({ query }) => {
  const { accession_code: accessionCode } = query
  const isFirst = accessionCode === 'GSE116436'
  // endpoint: 'v1/experiments/{accession_code}/'
  const experiment = isFirst ? experimentMock[0] : experimentMock[1]
  const samples = isFirst ? samplesTableMock[0][0] : samplesTableMock[1][0]

  return { props: { accessionCode, experiment, samples } }
}

export const Experiment = ({ accessionCode, experiment, samples }) => {
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
          <SamplesTable
            accessionCode={accessionCode}
            experiment={experiment}
            samples={samples}
          />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(Experiment)
