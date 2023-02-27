import { formatPipelinesText } from 'helpers/dataset'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading, Paragraph } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { links } from 'config'
import { PipelineSteps } from './PipelineSteps'
import { VersionInformation } from './VersionInformation'
import {
  AffymetrixScan,
  IlluminaScan,
  Salmon,
  SubmitterSupplied,
  Txtimport
} from './protocols'

export const Pipeline = ({
  isSubmitterProcessed,
  pipelinesText,
  results,
  sample
}) => {
  const protocols = {
    'Affymetrix SCAN': AffymetrixScan,
    'Illumina SCAN': IlluminaScan,
    MultiQC: null,
    'Salmon Quant': Salmon,
    'Submitter-processed': SubmitterSupplied,
    'Transcriptome Index': null,
    Tximport: Txtimport
  }

  const getProtocolDescription = (processorName) => {
    const Component = protocols[processorName]

    return !Component ? null : (
      <Component
        isSubmitterProcessed={isSubmitterProcessed}
        results={results}
        sample={sample}
        key={processorName}
      />
    )
  }

  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={2} size="h2_xsmall">
          {formatPipelinesText(pipelinesText)}
        </Heading>
        <PipelineSteps results={results} />
        {results.map(({ processor: { name } }, i, arr) => (
          <Box
            key={name}
            margin={{ bottom: isLastIndex(i, arr) ? 'xsmall' : 'medium' }}
          >
            {getProtocolDescription(name)}
          </Box>
        ))}
        <Paragraph>
          All samples available for download will be{' '}
          <strong>quantile normalized</strong>. For more information regarding
          how quantile normalization is performed and its limitations, see{' '}
          <Anchor
            href={links.refinebio_gitbut_quantile_normalization}
            label="our documentation"
            target="_blank"
            rel="noopener noreferrer"
          />
          .
        </Paragraph>
      </Box>
      <VersionInformation results={results} />
    </>
  )
}

export default Pipeline
