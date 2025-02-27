import { Box, Heading, Paragraph } from 'grommet'
import { Anchor } from 'components/Anchor'
import { InformationList, InformationItem } from 'components/InformationList'
import { links } from 'config'

export const GeoSubmitterSupplied = ({
  protocol_info: protocolInfo,
  isSubmitterProcessed = false
}) => {
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

export default GeoSubmitterSupplied
