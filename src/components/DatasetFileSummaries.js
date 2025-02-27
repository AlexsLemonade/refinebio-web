import { useState } from 'react'
import { Box, Heading, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { links } from 'config'
import getDatasetState from 'helpers/getDatasetState'
import getDownloadFilesData from 'helpers/getDownloadFilesData'
import { Anchor } from 'components/Anchor'
import { Column } from 'components/Column'
import { DatasetRegenerateDownloadOptionsForm } from 'components/Dataset/DatasetRegenerateDownloadOptionsForm'
import { InlineMessage } from 'components/InlineMessage'
import { Row } from 'components/Row'

const DatasetFileSummary = ({ description, format, index, title }) => {
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

export const DatasetFileSummaries = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { isProcessed } = getDatasetState(dataset) // sets visibility of the download options form for processed datasets
  const [regeneratedDataset, setRegeneratedDataset] = useState(
    isProcessed ? dataset : null
  )
  const fileSummaries = getDownloadFilesData(regeneratedDataset || dataset)

  return (
    <Box margin={{ top: 'large' }}>
      <Heading level={2} margin={{ bottom: 'small' }}>
        Download Files Summary
      </Heading>
      {isProcessed && (
        <DatasetRegenerateDownloadOptionsForm
          dataset={dataset}
          regeneratedDataset={regeneratedDataset}
          setRegeneratedDataset={setRegeneratedDataset}
        />
      )}
      <Row
        direction={setResponsive('column', 'column', 'row')}
        margin={{ bottom: 'medium' }}
      >
        {fileSummaries.files.map((fileSummary, i) => (
          <DatasetFileSummary
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

export default DatasetFileSummaries
