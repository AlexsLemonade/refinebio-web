import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'

import data from 'api/mockDataExperiment'

// TEMPORARY
export const getServerSideProps = ({ query }) => {
  const experiments =
    query.accession_code === 'GSE116436' ? data[0][0] : data[1][0]

  return { props: { experiments } }
}

export const Experiment = ({ experiments }) => {
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
        <Box elevation="medium" pad="medium">
          <Row margin={{ bottom: 'medium' }}>
            <Column>
              <Heading
                level={3}
                size="h3_small"
                margin={{ bottom: setResponsive('small', 'none') }}
              >
                Samples
              </Heading>
            </Column>
            <Column>
              <SamplesTableCTA />
            </Column>
          </Row>
          <SamplesTable experiments={experiments} />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(Experiment)
