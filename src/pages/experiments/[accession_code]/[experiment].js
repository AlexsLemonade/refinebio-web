import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { unionizeArrays } from 'helpers/unionizeArrays'
import { Box, Grid, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import {
  SearchCardHeader,
  SearchCardCTAs,
  SearchCardMeta
} from 'components/SearchCard'
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
        <Box elevation="medium" pad="large" margin={{ bottom: 'basex6' }}>
          <Grid
            areas={setResponsive(
              [
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'meta', start: [0, 1], end: [1, 1] },
                { name: 'ctas', start: [0, 2], end: [1, 2] }
              ],
              [
                { name: 'header', start: [0, 0], end: [0, 1] },
                { name: 'ctas', start: [1, 0], end: [1, 1] },
                { name: 'meta', start: [0, 2], end: [1, 2] }
              ]
            )}
            columns={['1fr', 'auto']}
            rows={['auto', 'auto', 'auto']}
            gap={{
              row: setResponsive('small', 'medium'),
              column: 'medium'
            }}
          >
            <Box gridArea="header">
              <SearchCardHeader
                accessionCode={accessionCode}
                title={experiment.title}
              />
            </Box>

            <Box
              gridArea="ctas"
              margin={{ top: setResponsive('none', 'large') }}
            >
              <SearchCardCTAs
                accessionCode={accessionCode}
                downloadableSamples={experiment.num_downloadable_samples}
                status=""
              />
            </Box>
            <Box gridArea="meta">
              <SearchCardMeta
                downloadableSamples={experiment.num_downloadable_samples}
                organismNames={experiment.organism_names}
                platformNames={unionizeArrays(
                  ...experiment.samples.map((sample) => sample.pretty_platform)
                )}
                technology={unionizeArrays(
                  ...experiment.samples.map((sample) => sample.technology)
                )}
                size="medium"
              />
            </Box>
          </Grid>
        </Box>
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
