import { Anchor } from 'components/shared/Anchor'
import { links } from 'config'
import { ProtocolDescription } from './ProtocolDescription'

export const Txtimport = () => {
  const name = 'Tximport'
  const description = (
    <>
      <i>tximport</i> imports transcript (tx)-level abundance estimates
      generated by
      <i>salmon quant</i> and summarizes them to the gene-level. We use the tx
      to gene mapping generated as part of our reference transcriptome
      processing pipeline. Our tximport implementation generates{' '}
      <Anchor
        href={links.r_docs_tximport}
        label='"lengthScaledTPM"'
        target="_blank"
        rel="noopener noreferrer"
      />
      , which are gene-level count-scale values that are generated by scaling
      TPM using the average transcript length across samples and to the library
      size. Note that tximport is applied at the <em>experiment-level</em>{' '}
      rather than to single samples. For additional information, see the{' '}
      <Anchor
        href={links.bioconductor_tximport}
        label="tximport Bioconductor page"
        target="_blank"
        rel="noopener noreferrer"
      />
      , the{' '}
      <Anchor
        href={links.bioconductor_tutorial}
        label={
          <>
            tximport tutorial{' '}
            <em>Importing transcript abundance datasets with tximport</em>
          </>
        }
        target="_blank"
        rel="noopener noreferrer"
      />
      , and{' '}
      <Anchor
        href={links.doi_f100_research_2015}
        label={
          <>
            Soneson, et al. <em>F1000Research.</em> 2015
          </>
        }
        target="_blank"
        rel="noopener noreferrer"
      />
      .
    </>
  )

  return <ProtocolDescription name={name} description={description} />
}

export default Txtimport