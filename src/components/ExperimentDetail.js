import { Fragment } from 'react'
import { nanoid } from 'nanoid'
import { Box, Grid, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { useSearchManager } from 'hooks/useSearchManager'
import { links } from 'config'
import formatNumbers from 'helpers/formatNumbers'
import getReadable from 'helpers/getReadable'
import getURLForAccessionCode from 'helpers/getURLForAccessionCode'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  InformationList,
  InformationItem
} from 'components/shared/InformationList'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'
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

export const ExperimentDetail = ({ experiment }) => {
  const { setResponsive } = useResponsive()
  const { navigateToSearch } = useSearchManager()

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
            value={<TextHighlight>{experiment.description}</TextHighlight>}
            margin={{ left: '-32px' }}
            width={{ min: 'calc(100% + 64px)' }}
          />
          <InformationItemBlock
            condition={experiment.pubmed_id}
            field="PubMedID"
            value={
              <Anchor
                label={<TextHighlight>{experiment.pubmed_id}</TextHighlight>}
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
                  <TextHighlight>{experiment.publication_title}</TextHighlight>
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
  )
}

export default ExperimentDetail
