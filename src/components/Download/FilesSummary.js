import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { links } from 'config'

const Card = ({ description, format, index, title }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      align="center"
      background="white"
      elevation="medium"
      flexValue={setResponsive('1 1 auto', '1 1 auto', '1 1 0')}
      pad="medium"
      margin={{
        left: index ? setResponsive('none', 'none', 'large') : 'none',
        bottom: setResponsive('large', 'large', 'none')
      }}
    >
      <Heading level={5} margin={{ bottom: 'small' }} responsive={false}>
        {title}
      </Heading>
      <Box direction="row" justify="between" fill>
        <Text>{description}</Text>
        <Text>Format: {format}</Text>
      </Box>
    </Column>
  )
}

export const FilesSummary = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  // returns the file size estimates of the given dataset and its aggregate_by value (either 'EXPERIMENT' or 'SPECIES')
  const downloadFilesData = (data, samplesBySpecies, aggregateBy) => {
    const totalExperiments = Object.keys(data).length
    // metadata info of a download https://github.com/AlexsLemonade/refinebio-frontend/issues/25#issuecomment-395870627
    // the samples aggregated by 'EXPERIMENT'
    const aggregatedByExperiment = () => ({
      files: [
        {
          title: `${totalExperiments} Gene Expression Matrices`,
          description: '1 file per Experiment',
          format: 'tsv'
        },
        {
          title: `${totalExperiments} Sample Metadata Files`,
          description: '1 file per Experiment',
          format: 'tsv'
        },
        {
          title: `${totalExperiments} Experiment Metadata Files`,
          description: '1 file per Experiment',
          format: 'json'
        }
      ]
    })
    // the samples aggregated by 'SPECIES'
    const aggregatedBySpecies = () => {
      const totalSpecies = Object.keys(samplesBySpecies).length

      return {
        files: [
          {
            title: `${totalSpecies} Gene Expression Matrices`,
            description: '1 file per Species',
            format: 'tsv'
          },
          {
            title: `${totalExperiments} Sample Metadata Files`,
            description: '1 file per Experiment',
            format: 'tsv'
          },
          {
            title: `${totalSpecies} Species Metadata`,
            description: '1 file per Species',
            format: 'json'
          }
        ]
      }
    }

    return aggregateBy === 'SPECIES'
      ? aggregatedBySpecies(dataset, samplesBySpecies)
      : aggregatedByExperiment(dataset)
  }

  const samplesBySpecies = dataset.organism_samples
  const fileSummaries = downloadFilesData(
    dataset.data,
    samplesBySpecies,
    dataset.aggregate_by
  )

  return (
    <Box margin={{ top: 'large' }}>
      <Heading level={2} margin={{ bottom: 'small' }}>
        Download Files Summary
      </Heading>
      <Row
        direction={setResponsive('column', 'column', 'row')}
        margin={{ bottom: 'medium' }}
      >
        {fileSummaries.files.map((fileSummary, i) => (
          <Card
            key={fileSummary.title}
            description={fileSummary.description}
            format={fileSummary.format}
            index={i}
            title={fileSummary.title}
          />
        ))}
      </Row>
      <InlineMessage
        color="info"
        fontSize="medium"
        margin={{
          right: 'xsmall',
          bottom: setResponsive('xsmall', 'none')
        }}
        label={
          <>
            All data you download from refine.bio has been uniformly processed
            and normalized. Learn more.{' '}
            <Anchor
              href={links.refinebio_docs_standard_pipeline}
              label="Learn More"
              rel="noopener noreferrer"
              target="_blank"
            />
          </>
        }
        name="Info"
      />
    </Box>
  )
}

export default FilesSummary
