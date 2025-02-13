import { Text } from 'grommet'
import { Anchor } from 'components/Anchor'
import { links } from 'config'
import { ProtocolDescription } from './ProtocolDescription'

export const AffymetrixScan = () => {
  const name = 'SCAN'
  const description = (
    <>
      SCAN (Single Channel Array Normalization) is a normalization method for
      single channel (Affymetrix) microarrays that allows us to process
      individual samples. SCAN models and corrects for the effect of technical
      bias, such as GC content, using a mixture-modeling approach. For more
      information about this approach, see the primary publication (Piccolo, et
      al. <i>Genomics</i>. 2012.{' '}
      <Anchor
        href={links.doi_scan}
        label={`DOI: ${links.doi_scan.substring(15)}`}
        target="_blank"
        rel="noopener noreferrer"
      />
      ){' '}
      <Text>
        and the SCAN.UPC bioconductor package documentation (
        <Anchor
          href={links.doi_scan_upc_bioconductor_docs}
          label={`DOI: ${links.doi_scan_upc_bioconductor_docs.substring(16)}`}
          target="_blank"
          rel="noopener noreferrer"
        />
        ).
      </Text>
    </>
  )

  return <ProtocolDescription name={name} description={description} />
}

export default AffymetrixScan
