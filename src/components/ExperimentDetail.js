import { Fragment } from 'react'
import { nanoid } from 'nanoid'
import { Box, Grid, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import { links } from 'config'
import formatNumbers from 'helpers/formatNumbers'
import getReadable from 'helpers/getReadable'
import getURLForAccessionCode from 'helpers/getURLForAccessionCode'
import { Anchor } from 'components/Anchor'
import { Button } from 'components/Button'
import { ExperimentCardAction } from 'components/ExperimentCardAction'
import { ExperimentCardHeader } from 'components/ExperimentCardHeader'
import { ExperimentCardMeta } from 'components/ExperimentCardMeta'
import { FixedContainer } from 'components/FixedContainer'
import { InformationList, InformationItem } from 'components/InformationList'
import { TextHighlight } from 'components/TextHighlight'

export const ExperimentDetail = ({ experiment }) => {
  const { setResponsive } = useResponsive()
  const { navigateToSearch } = useSearchManager()

  const alternateAccessionCode = experiment.alternate_accession_code
  const isGEOD = alternateAccessionCode.startsWith('E-GEOD')

  return (
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
            <ExperimentCardHeader experiment={experiment} />
          </Box>
          <Box
            gridArea="ctas"
            margin={{ top: setResponsive('none', 'large') }}
            align="end"
          >
            <ExperimentCardAction experiment={experiment} />
          </Box>
          <Box gridArea="meta">
            <ExperimentCardMeta experiment={experiment} size="medium" />
          </Box>
        </Grid>
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={4} responsive={false}>
            Submitter Supplied Information
          </Heading>
        </Box>
        <Box margin={{ left: '-32px' }} width={{ min: 'calc(100% + 64px)' }}>
          <InformationList>
            <InformationItem
              field="Description"
              value={experiment.description}
            />
            <InformationItem
              field="PubMedID"
              value={
                <Anchor
                  label={<TextHighlight>{experiment.pubmed_id}</TextHighlight>}
                  href={`${links.nih}${experiment.pubmed_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              fallback="No associated PubMed ID"
              forceFallback={!experiment.pubmed_id}
            />
            <InformationItem
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
              fallback="No associated publication"
              forceFallback={!experiment.publication_title}
            />
            <InformationItem
              field="Total Samples"
              value={formatNumbers(experiment.num_total_samples)}
            />
            <InformationItem
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
              fallback="No associated institution"
              forceFallback={
                !experiment.submitter_institution ||
                experiment.submitter_institution === 'N/A'
              }
            />
            <InformationItem
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
              fallback="No associated authors"
              forceFallback={experiment.publication_authors.length === 0}
            />
            <InformationItem
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
              forceFallback={!experiment.source_database}
            />
            <InformationItem
              field="Alternate Accession IDs"
              value={
                isGEOD ? (
                  <TextHighlight>{alternateAccessionCode}</TextHighlight>
                ) : (
                  <Anchor
                    label={
                      <TextHighlight>{alternateAccessionCode}</TextHighlight>
                    }
                    href={getURLForAccessionCode(alternateAccessionCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                )
              }
              fallback="None"
              forceFallback={!alternateAccessionCode}
            />
          </InformationList>
        </Box>
      </Box>
    </FixedContainer>
  )
}

export default ExperimentDetail
