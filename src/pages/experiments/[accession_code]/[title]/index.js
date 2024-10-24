import { Fragment, memo, useEffect, useState, useRef } from 'react'
import { nanoid } from 'nanoid'
import { Box, Grid, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useLayoutRefs } from 'hooks/useLayoutRefs'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { SamplesTableManagerContextProvider } from 'contexts/SamplesTableManagerContext'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { api } from 'api'
import { links } from 'config'
import formatNumbers from 'helpers/formatNumbers'
import scrollTo from 'helpers/scrollTo'
import { getFormattedExperiment } from 'helpers/formatDatasetAction'
import getPlatformNamesFromExperiment from 'helpers/getPlatformNamesFromExperiment'
import getTechnologyFromExperiment from 'helpers/getTechnologyFromExperiment'
import getReadable from 'helpers/getReadable'
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

export const Experiment = ({ experiment }) => {
  const { accession_code: accessionCode } = experiment
  const { back } = useRouter()
  const { setResponsive } = useResponsive()
  const { search, navigateToSearch } = useSearchManager()
  const { headerRef } = useLayoutRefs()
  const tableRef = useRef(null)
  const fromSearch = search.ref === 'search'
  const fromViewSamples = search.from === 'view-samples'
  const [hasSamples, setHasSamples] = useState(false)

  const scrollToTable = () => {
    const offset = (headerRef.current.offsetHeight || 0) + 10
    const tableTop =
      tableRef.current.getBoundingClientRect().top + window.scrollY - offset
    scrollTo({
      top: tableTop
    })
  }

  // prevents hydration error on page load for SamplesTable
  useEffect(() => {
    setHasSamples(experiment.samples.length > 0)
  }, [hasSamples])

  useEffect(() => {
    if (!fromViewSamples || !hasSamples || !tableRef.current) return
    // triggers initial scrolling
    scrollToTable()
    // watches layout changes and updates scroll position
    const resizeObserver = new ResizeObserver(() => scrollToTable())
    resizeObserver.observe(document.body)

    // eslint-disable-next-line consistent-return
    return () => {
      resizeObserver.disconnect()
    }
  }, [fromViewSamples, hasSamples])

  return (
    <>
      <PageTitle title={`${`${accessionCode} - ${experiment.title}`} -`} />
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
                  <SearchCardHeader experiment={experiment} />
                </Box>
                <Box
                  gridArea="ctas"
                  margin={{ top: setResponsive('none', 'large') }}
                  align="end"
                >
                  <SearchCardAction experiment={experiment} />
                </Box>
                <Box gridArea="meta">
                  <SearchCardMeta experiment={experiment} size="medium" />
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
                    <TextHighlight>{experiment.description}</TextHighlight>
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
                        <TextHighlight>{experiment.pubmed_id}</TextHighlight>
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
                  value={experiment.publication_authors.map((author, i) => (
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
                  ))}
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
                          {getReadable(experiment.source_database)}
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
          <Box ref={tableRef}>
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
                      downloadableSamples={experiment.num_downloadable_samples}
                    />
                  </Column>
                </Row>
                {hasSamples ? (
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
                ) : (
                  <Spinner />
                )}
              </Box>
            </FixedContainer>
          </Box>
        </Box>
      </TextHighlightContextProvider>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const response = await api.experiments.get(query.accession_code)

  if (!response) {
    return {
      notFound: true
    }
  }

  const platformNames = getPlatformNamesFromExperiment(response.samples)
  const technology = getTechnologyFromExperiment(response.samples)
  const experiment = { ...response, platform_names: platformNames, technology }

  return {
    props: { experiment }
  }
}

export default memo(Experiment)
