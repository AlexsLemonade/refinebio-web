import { Fragment, memo, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Box, Grid, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useExperiments } from 'hooks/useExperiments'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { SamplesTableManagerContextProvider } from 'contexts/SamplesTableManagerContext'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { links } from 'config'
import formatNumbers from 'helpers/formatNumbers'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import getURLForAccessionCode from 'helpers/getURLForAccessionCode'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  InformationList,
  InformationItem
} from 'components/shared/InformationList'
import { Row } from 'components/shared/Row'
import { PageTitle } from 'components/shared/PageTitle'
import { Spinner } from 'components/shared/Spinner'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'
import {
  SamplesTable,
  SamplesTableAction
} from 'components/shared/SamplesTable'
import { SearchCardHeader } from 'components/shared/SearchCard/SearchCardHeader'
import { SearchCardAction } from 'components/shared/SearchCard/SearchCardAction'
import { SearchCardMeta } from 'components/shared/SearchCard/SearchCardMeta'

const InformationItemBlock = ({ condition, field, value, textNull = '' }) => (
  <InformationItem
    field={field}
    value={condition ? value : <TextNull text={textNull} />}
    margin={{ left: '-32px' }}
    width={{ min: 'calc(100% + 64px)' }}
  />
)

export const Experiment = () => {
  const {
    back,
    isReady,
    query: { accession_code: accessionCode }
  } = useRouter()
  const {
    databaseNames,
    experiment,
    loading,
    hasSamples,
    getExperiment,
    getPlatformNames,
    getTechnologyNames
  } = useExperiments()
  const { search, navigateToSearch } = useSearchManager()
  const fromSearch = search.ref === 'search'
  const { setResponsive } = useResponsive()

  useEffect(() => {
    if (isReady) getExperiment(accessionCode)
  }, [isReady])

  return (
    <>
      <PageTitle
        title={`${
          experiment ? `${accessionCode} - ${experiment.title}` : 'Loading'
        } -`}
      />
      <TextHighlightContextProvider match={fromSearch && search.search}>
        <Box height={{ min: '50%' }}>
          <FixedContainer pad="large">
            {fromSearch && (
              <Button
                label="Back to Results"
                secondary
                responsive
                onClick={back}
              />
            )}
          </FixedContainer>
          {loading ? (
            <Box align="center" fill justify="center" margin={{ top: 'large' }}>
              <Spinner />
            </Box>
          ) : (
            hasSamples && (
              <Box>
                <FixedContainer>
                  <Box
                    elevation="medium"
                    pad="large"
                    margin={{ bottom: 'basex6' }}
                  >
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
                        align="end"
                      >
                        <SearchCardAction
                          accessionCode={accessionCode}
                          downloadableSamples={
                            experiment.num_downloadable_samples
                          }
                          organismNames={experiment.organism_names}
                          technology={getTechnologyNames()}
                        />
                      </Box>
                      <Box gridArea="meta">
                        <SearchCardMeta
                          downloadableSamples={
                            experiment.num_downloadable_samples
                          }
                          organismNames={experiment.organism_names}
                          platformNames={getPlatformNames()}
                          technology={getTechnologyNames()}
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
                        value={
                          <TextHighlight>
                            {experiment.description}
                          </TextHighlight>
                        }
                        margin={{ left: '-32px' }}
                        width={{ min: 'calc(100% + 64px)' }}
                      />
                      <InformationItemBlock
                        condition={experiment.pubmed_id}
                        field="PubMedID"
                        value={
                          <Anchor
                            label={
                              <TextHighlight>
                                {experiment.pubmed_id}
                              </TextHighlight>
                            }
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
                            label={
                              <TextHighlight>
                                {experiment.publication_title}
                              </TextHighlight>
                            }
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
                        condition={
                          experiment.submitter_institution &&
                          experiment.submitter_institution !== 'N/A'
                        }
                        field="Submitter’s Institution"
                        value={
                          <Button
                            label={
                              <TextHighlight>
                                {experiment.submitter_institution}
                              </TextHighlight>
                            }
                            link
                            linkFontSize="medium"
                            underlineOnHover
                            onClick={() =>
                              navigateToSearch({
                                search: `submitter_institution: ${experiment.submitter_institution}`
                              })
                            }
                          />
                        }
                        textNull="No associated institution"
                      />
                      <InformationItemBlock
                        condition={experiment.publication_authors.length > 0}
                        field="Authors"
                        value={experiment.publication_authors.map(
                          (author, i) => (
                            <Fragment key={nanoid()}>
                              {i ? ', ' : ''}
                              <Button
                                display="inline-block"
                                label={<TextHighlight>{author}</TextHighlight>}
                                link
                                linkFontSize="medium"
                                underlineOnHover
                                onClick={() =>
                                  navigateToSearch({
                                    search: `publication_authors:${author}`
                                  })
                                }
                              />
                            </Fragment>
                          )
                        )}
                        textNull="No associated authors"
                        direction="row"
                      />
                      <InformationItemBlock
                        condition={experiment.source_database}
                        field="Source Repositories"
                        value={
                          <Anchor
                            label={
                              <TextHighlight>
                                {databaseNames[experiment.source_database]}
                              </TextHighlight>
                            }
                            href={experiment.source_url}
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
                            label={
                              <TextHighlight>
                                {experiment.alternate_accession_code}
                              </TextHighlight>
                            }
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
                        <SamplesTableAction
                          accessionCode={accessionCode}
                          downloadableSamples={
                            experiment.num_downloadable_samples
                          }
                        />
                      </Column>
                    </Row>
                    <SamplesTableManagerContextProvider>
                      <SamplesTable
                        allSamples={getFormattedExperiment(
                          accessionCode,
                          experiment.num_downloadable_samples
                        )}
                        sampleAccessionsInExperiment={{
                          [experiment.accession_code]: experiment.samples.map(
                            (sample) => sample.accession_code
                          )
                        }}
                        queryToAdd={{
                          experiment_accession_code: accessionCode
                        }}
                        sampleMetadataFields={experiment.sample_metadata}
                        showOnlyAddedSamples
                      />
                    </SamplesTableManagerContextProvider>
                  </Box>
                </FixedContainer>
              </Box>
            )
          )}
        </Box>
      </TextHighlightContextProvider>
    </>
  )
}

export default memo(Experiment)
