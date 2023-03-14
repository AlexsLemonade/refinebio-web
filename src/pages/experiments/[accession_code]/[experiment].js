import { memo } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { getExperimentPageData } from 'api/mockHelper'
import { getURLForAccessionCode } from 'helpers/getURLForAccessionCode'
import { unionizeArrays } from 'helpers/unionizeArrays'
import { Box, Grid, Heading } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  InformationList,
  InformationItem
} from 'components/shared/InformationList'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import { SearchCardHeader } from 'components/SearchCard/SearchCardHeader'
import { SearchCardCTAs } from 'components/SearchCard/SearchCardCTAs'
import { SearchCardMeta } from 'components/SearchCard/SearchCardMeta'

import { links } from 'config'

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
  const databaseNames = {
    GEO: 'Gene Expression Omnibus (GEO)',
    SRA: 'Sequence Read Archive (SRA)',
    ARRAY_EXPRESS: 'ArrayExpress'
  }

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
            margin={{ bottom: 'medium' }}
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
          <Box margin={{ bottom: 'large' }}>
            <Heading level={4} size="h4_xsmall">
              Submitter Supplied Information
            </Heading>
          </Box>
          <InformationList>
            <InformationItem
              field="Description"
              value={experiment.description}
            />
            {experiment.pubmed_id ? (
              <InformationItem
                field="PubMedID"
                value={
                  <Anchor
                    label={experiment.pubmed_id}
                    href={`${links.nih}${experiment.pubmed_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              />
            ) : (
              <TextNull label="No associated PubMed ID" />
            )}
            {experiment.publication_title ? (
              <InformationItem
                field="Publication Title"
                value={
                  <Anchor
                    label={experiment.publication_title}
                    href={`${links.nih}${experiment.pubmed_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              />
            ) : (
              <TextNull label="No associated publication" />
            )}
            <InformationItem
              field="Total Samples"
              value={experiment.num_total_samples}
            />
            {experiment.submitter_institution ? (
              <InformationItem
                field="Submitter’s Institution"
                value={
                  <Anchor
                    label={experiment.submitter_institution}
                    href={{
                      pathname: '/search',
                      query: {
                        q: `submitter_institution:${experiment.submitter_institution}`
                      }
                    }}
                  />
                }
              />
            ) : (
              <TextNull label="No associated institution" />
            )}
            {experiment.publication_authors.length > 0 ? (
              <InformationItem
                field="Authors"
                value={experiment.publication_authors.map((author, i) => (
                  <>
                    {i ? ', ' : ''}
                    <Anchor
                      key={author}
                      label={author}
                      href={{
                        pathname: '/search',
                        query: {
                          q: `publication_authors:${author}`
                        }
                      }}
                    />
                  </>
                ))}
              />
            ) : (
              <TextNull label="No associated authors" />
            )}
            {experiment.source_database && (
              <InformationItem
                field="Source Repositories"
                value={databaseNames[experiment.source_database]}
              />
            )}
            {experiment.alternate_accession_code ? (
              <InformationItem
                field="Alternate Accession IDs"
                value={
                  <Anchor
                    label={experiment.alternate_accession_code}
                    href={getURLForAccessionCode(
                      experiment.alternate_accession_code
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  />
                }
              />
            ) : (
              <TextNull label="None" />
            )}
          </InformationList>
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
