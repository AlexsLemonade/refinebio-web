import { Box, Heading, Paragraph, Text } from 'grommet'
import formatString from 'helpers/formatString'
import truncateOnWord from 'helpers/truncateOnWord'
import { links } from 'config'
import { Accordion, AccordionPanel } from 'components/Accordion'
import { Anchor } from 'components/Anchor'
import { InformationList, InformationItem } from 'components/InformationList'

const Title =
  ({ protocol }) =>
  (expand) =>
    (
      <>
        <Heading level={5} responsive={false} weight="500">
          {formatString(protocol.Type)}
        </Heading>
        <Text>
          {!expand ? truncateOnWord(protocol.Text, 80) : protocol.Text}
        </Text>
      </>
    )

const ArrayExpress = ({ protocol_info: protocolInfo }) => {
  return (
    <Box pad={{ horizontal: 'large' }}>
      <Accordion>
        {protocolInfo.map((protocol) => (
          <AccordionPanel key={protocol.Accession} title={Title({ protocol })}>
            <Text margin={{ top: 'xsmall' }}>
              <strong>Reference</strong>{' '}
              <Anchor
                label={protocol.Reference}
                href={protocol.Reference}
                rel="noopener noreferrer"
                target="_blank"
              />
            </Text>
          </AccordionPanel>
        ))}
      </Accordion>
    </Box>
  )
}

const Geo = ({ protocol_info: protocolInfo, isSubmitterProcessed = false }) => {
  const protocolProtocolList = [
    'Extraction protocol',
    'Label protocol',
    'Hybridization protocol',
    'Scan protocol',
    'Data processing'
  ]

  return (
    <>
      <InformationList>
        {protocolProtocolList.map(
          (field) =>
            protocolInfo[field] && (
              <InformationItem
                key={field}
                field={field}
                value={protocolInfo[field].join('. ')}
              />
            )
        )}
        {protocolInfo.Reference && (
          <InformationItem
            field="Reference"
            value={
              <Anchor
                href={protocolInfo.Reference}
                label={protocolInfo.Reference}
                rel="noopener noreferrer"
                target="_blank"
              />
            }
          />
        )}
      </InformationList>
      {isSubmitterProcessed && (
        <Box
          border={{ side: 'top' }}
          margin={{ top: 'large' }}
          pad={{ horizontal: 'large', top: 'large' }}
        >
          <Box margin={{ bottom: 'xsmall' }}>
            <Heading level={3}>Gene Identifier Conversion</Heading>
          </Box>
          <Paragraph>
            We have created custom gene mapping files for Affymetrix platforms
            (see:{' '}
            <Anchor
              href={links.identifier_refinery_github_repo}
              label={links.identifier_refinery_github_repo}
              target="_blank"
              rel="noopener noreferrer"
            />
            ) that support conversion from probe IDs, gene symbols, Entrez IDs,
            RefSeq and Unigene identifiers to Ensembl gene IDs. We support
            conversion from Illumina BeadArray probe IDs to Ensembl gene IDs
            using Bioconductor Illumina BeadArray expression packages.
          </Paragraph>
        </Box>
      )}
    </>
  )
}

const SRA = ({ protocol_info: protocolInfo }) => (
  <Box pad={{ horizontal: 'large' }}>
    {protocolInfo.map((info) => (
      <Box key={info.Description}>
        <Paragraph>{info.Description}</Paragraph>
        <Text margin={{ top: 'xsmall' }}>
          <strong>Reference</strong>{' '}
          <Anchor
            href={info.Reference}
            label={info.Reference}
            rel="noopener noreferrer"
            target="_blank"
          />
        </Text>
      </Box>
    ))}
  </Box>
)

// renders the submitter supplied protocol information which depends on the type of sample
// https://github.com/AlexsLemonade/refinebio-frontend/issues/225#issuecomment-417345139
export const SamplesTableProcessingInformationSubmitterSupplied = ({
  sample,
  isSubmitterProcessed
}) => {
  const protocolsBySampleType = {
    GEO: Geo,
    SRA,
    ARRAY_EXPRESS: ArrayExpress
  }
  const Component = protocolsBySampleType[sample?.source_database]

  if (!Component) {
    return null
  }

  return (
    <>
      <Box margin={{ bottom: 'small' }} pad={{ horizontal: 'large' }}>
        <Heading level={2} size="small">
          Submitter Supplied Protocol
        </Heading>
      </Box>
      <Component
        protocol_info={sample.protocol_info}
        isSubmitterProcessed={isSubmitterProcessed}
      />
    </>
  )
}

export default SamplesTableProcessingInformationSubmitterSupplied
