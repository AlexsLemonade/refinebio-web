import { useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import gtag from 'api/analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { links, options } from 'config'
import formatString from 'helpers/formatString'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { DownloadOptionsForm } from './DownloadOptionsForm'

const Card = ({ description, format, index, title }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column
      align="center"
      background="white"
      elevation="medium"
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

export const FilesSummary = ({
  dataset,
  defaultDataset = {},
  isExpired,
  isProcessed
}) => {
  const { createDataset, updateDataset, regeneratedDataset } =
    useDatasetManager()
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
  const transformationOptions = options.transformation.reduce(
    (acc, cur) => ({ ...acc, [cur.value]: cur.label }),
    {}
  )

  const [openForm, setOpenForm] = useState(false)

  const handleRegenerateDataset = async (downloadOptions) => {
    const params = { data: dataset.data, ...downloadOptions }
    const response = await updateDataset(
      regeneratedDataset?.id || (await createDataset()),
      params
    )
    const pathname = `/dataset/${response.id}`

    gtag.regeneratedDataset(
      isExpired && isProcessed,
      defaultDataset,
      JSON.stringify(defaultDataset) !== JSON.stringify(dataset)
        ? dataset
        : null
    )

    return pathname
  }

  return (
    <Box margin={{ top: 'large' }}>
      <Heading level={2} margin={{ bottom: 'small' }}>
        Download Files Summary
      </Heading>

      {isProcessed && (
        <Box margin={{ bottom: 'small' }}>
          {!openForm && (
            <Box direction="row" gap="xlarge">
              <Text weight="bold">
                Aggregate by: {formatString(dataset.aggregate_by)}
              </Text>
              <Text weight="bold">
                Transformation: {transformationOptions[dataset.scale_by]}
              </Text>
              {!dataset.quantile_normalize && (
                <Text weight="bold">
                  Quantile Normalization Skipped for RNA-seq samples
                </Text>
              )}
              <Text weight="bold">
                <Button
                  label="Change"
                  link
                  linkFontSize="16px"
                  onClick={() => setOpenForm(true)}
                />
              </Text>
            </Box>
          )}
          <ExpandableBlock duration="1.2s" expand={openForm}>
            <DownloadOptionsForm
              dataset={dataset}
              buttonLabel="Regenerate Dataset"
              isProcessed={isProcessed}
              onSubmit={handleRegenerateDataset}
            />
          </ExpandableBlock>
        </Box>
      )}

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
        fontSize="medium"
        margin={{
          right: 'xsmall',
          bottom: setResponsive('xsmall', 'none')
        }}
      />
    </Box>
  )
}

export default FilesSummary
