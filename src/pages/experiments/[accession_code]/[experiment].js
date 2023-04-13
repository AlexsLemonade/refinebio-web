import { Fragment, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from 'api'
import { links } from 'config'
import { nanoid } from 'nanoid'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import getURLForAccessionCode from 'helpers/getURLForAccessionCode'
import unionizeArrays from 'helpers/unionizeArrays'
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
import { Spinner } from 'components/shared/Spinner'
import { TextNull } from 'components/shared/TextNull'
import { SamplesTable, SamplesTableCTA } from 'components/SamplesTable'
import { SearchCardHeader } from 'components/SearchCard/SearchCardHeader'
import { SearchCardCTAs } from 'components/SearchCard/SearchCardCTAs/SearchCardCTAs'
import { SearchCardMeta } from 'components/SearchCard/SearchCardMeta'

const InformationItemBlock = ({ condition, field, value, textNull = '' }) => (
  <InformationItem
    field={field}
    value={condition ? value : <TextNull text={textNull} />}
    margin={{ left: '-32px' }}
    width={{ min: 'calc(100% + 64px)' }}
  />
)

export const Experiment = () => {
  const router = useRouter()
  const { setResponsive } = useResponsive()
  const databaseNames = {
    GEO: 'Gene Expression Omnibus (GEO)',
    SRA: 'Sequence Read Archive (SRA)',
    ARRAY_EXPRESS: 'ArrayExpress'
  }
  const [experiment, setExperiment] = useState([])
  const [accessionCode, setAccessionCode] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    // endpoints:
    // `v1/experiments/${accession_code}/`
    const getExperiment = async (param) => {
      const result = await api.experiments.get(param)
      setExperiment(result)
      setLoading(false)
    }

    if (router.isReady) {
      setAccessionCode(router.query.accession_code)
      getExperiment(router.query.accession_code)
    }
  }, [router.isReady])

  return (
    <Box height={{ min: '50%' }}>
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

      {loading ? (
        <Box align="center" fill justify="center" margin={{ top: 'large' }}>
          <Spinner />
        </Box>
      ) : (
        experiment?.samples?.length && (
          <Box>
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
                      isLinked={false}
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
                        ...experiment.samples.map(
                          (sample) => sample.pretty_platform
                        )
                      )}
                      technology={unionizeArrays(
                        ...experiment.samples.map((sample) => sample.technology)
                      )}
                      size="medium"
                    />
                  </Box>
                </Grid>
                <Box margin={{ bottom: 'medium' }}>
                  <Heading level={4} responsive={false}>
                    Submitter Supplied Information
                  </Heading>
                </Box>
                <InformationList>
                  <InformationItem
                    field="Description"
                    value={experiment.description}
                    margin={{ left: '-32px' }}
                    width={{ min: 'calc(100% + 64px)' }}
                  />
                  <InformationItemBlock
                    condition={experiment.pubmed_id}
                    field="PubMedID"
                    value={
                      <Anchor
                        label={experiment.pubmed_id}
                        href={`${links.nih}${experiment.pubmed_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    textNull="No associated PubMed ID"
                  />
                  <InformationItemBlock
                    condition={experiment.publication_title}
                    field="Publication Title"
                    value={
                      <Anchor
                        label={experiment.publication_title}
                        href={`${links.nih}${experiment.pubmed_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    textNull="No associated publication"
                  />
                  <InformationItem
                    field="Total Samples"
                    value={formatNumbers(experiment.num_total_samples)}
                  />
                  <InformationItemBlock
                    condition={experiment.submitter_institution}
                    field="Submitter’s Institution"
                    value={
                      <Anchor
                        label={experiment.submitter_institution}
                        href={{
                          pathname: '/search',
                          query: {
                            search: `submitter_institution: ${experiment.submitter_institution}`
                          }
                        }}
                      />
                    }
                    textNull="No associated institution"
                  />
                  <InformationItemBlock
                    condition={experiment.publication_authors.length > 0}
                    field="Authors"
                    value={experiment.publication_authors.map((author, i) => (
                      <Fragment key={nanoid()}>
                        {i ? ', ' : ''}
                        <Anchor
                          label={author}
                          href={{
                            pathname: '/search',
                            query: {
                              search: `publication_authors:${author}`
                            }
                          }}
                        />
                      </Fragment>
                    ))}
                    textNull="No associated authors"
                  />
                  <InformationItemBlock
                    condition={experiment.source_database}
                    field="Source Repositories"
                    value={
                      <Anchor
                        label={databaseNames[experiment.source_database]}
                        href={databaseNames[experiment.source_database]}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                  />
                  <InformationItemBlock
                    condition={experiment.alternate_accession_code}
                    field="Alternate Accession IDs"
                    value={
                      <Anchor
                        label={experiment.alternate_accession_code}
                        href={getURLForAccessionCode(
                          experiment.alternate_accession_code
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    textNull="None"
                  />
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
                  experimentSampleAssociations={{
                    [experiment.accession_code]: experiment.samples.map(
                      (sample) => sample.accession_code
                    )
                  }}
                  paramsToAdd={{ experiment_accession_code: accessionCode }}
                  sampleMetadataFields={experiment.sample_metadata}
                />
              </Box>
            </FixedContainer>
          </Box>
        )
      )}
    </Box>
  )
}

export default memo(Experiment)
