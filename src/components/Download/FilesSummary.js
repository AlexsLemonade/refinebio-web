import { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { links } from 'config'
import getDownloadFilesData from 'helpers/getDownloadFilesData'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { DatasetRegenerateDownloadOptionsForm } from 'components/Dataset/DatasetRegenerateDownloadOptionsForm'

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

export const FilesSummary = ({ dataset }) => {
  const {
    organism_samples: organismSamples,
    aggregate_by: aggregateBy,
    is_processed: isProcessed,
    success
  } = dataset

  const { setResponsive } = useResponsive()
  const isProcessedSuccess = isProcessed && success // sets visibility of the download options form
  const [regeneratedDataset, setRegeneratedDataset] = useState(null)
  const [fileSummaries, setFileSummaries] = useState(
    getDownloadFilesData(dataset, organismSamples, aggregateBy)
  )

  useEffect(() => {
    // sets successfully processed dataset as regeneratedDataset
    if (isProcessedSuccess) setRegeneratedDataset(dataset)
  }, [])

  useEffect(() => {
    // updates fileSummaries on download options change
    if (regeneratedDataset) {
      setFileSummaries(
        getDownloadFilesData(
          regeneratedDataset,
          regeneratedDataset.organism_samples,
          regeneratedDataset.aggregate_by
        )
      )
    } else {
      setFileSummaries(
        getDownloadFilesData(dataset, organismSamples, aggregateBy)
      )
    }
  }, [dataset, regeneratedDataset])

  return (
    <Box margin={{ top: 'large' }}>
      <Heading level={2} margin={{ bottom: 'small' }}>
        Download Files Summary
      </Heading>
      <DatasetRegenerateDownloadOptionsForm
        dataset={dataset}
        regeneratedDataset={regeneratedDataset}
        setRegeneratedDataset={setRegeneratedDataset}
        show={isProcessedSuccess}
      />
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
