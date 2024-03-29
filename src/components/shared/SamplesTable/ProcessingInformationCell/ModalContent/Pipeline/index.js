import { Box, Heading, Paragraph } from 'grommet'
import isLastIndex from 'helpers/isLastIndex'
import { Anchor } from 'components/shared/Anchor'
import { links } from 'config'
import { PipelineSteps } from './PipelineSteps'
import { VersionInformation } from './VersionInformation'
import { AffymetrixScan } from './AffymetrixScan'
import { IlluminaScan } from './IlluminaScan'
import { Salmon } from './Salmon'
import { Txtimport } from './Txtimport'
import { SubmitterSupplied } from '../SubmitterSupplied'

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

  // formats the pipelines' name for UI (e.g., ['Salmon Quant', 'Tximport'] to 'Salmon Quant, and Specimen part')
  const formatPipelinesText = (names) =>
    names.length === 1
      ? names[0]
      : `${names.slice(0, names.length - 1).join(', ')}, and ${
          names[names.length - 1]
        }`

  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Heading level={2} size="small">
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
