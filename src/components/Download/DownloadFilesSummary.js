import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { downloadFilesData } from 'helpers/dataset'
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

export const DownloadFilesSummary = ({ dataset }) => {
  const { setResponsive } = useResponsive()
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

export default DownloadFilesSummary
