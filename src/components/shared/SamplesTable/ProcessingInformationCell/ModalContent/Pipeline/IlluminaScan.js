import { Anchor } from 'components/Anchor'
import { links } from 'config'
import { ProtocolDescription } from './ProtocolDescription'

export const IlluminaScan = () => {
  const name = 'SCAN'
  const description = (
    <>
      SCAN (Single Channel Array Normalization) is a normalization method for
      single channel microarrays that allows us to process individual samples.
      It was originally developed for Affymetrix microarrays. In our system, it
      has been adapted for Illumina BeadArrays. SCAN models and corrects for the
      effect of technical bias, such as GC content, using a mixture-modeling
      approach. For more information about this approach, see the primary
      publication (Piccolo, et al. <i>Genomics</i>. 2012.{' '}
      <Anchor
        href={links.doi_scan}
        label={`DOI: ${links.doi_scan.substring(15)}`}
        target="_blank"
        rel="noopener noreferrer"
      />
      ).
    </>
  )

  return <ProtocolDescription name={name} description={description} />
}

export default IlluminaScan
