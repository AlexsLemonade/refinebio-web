import { Anchor } from 'components/shared/Anchor'
import { links } from 'config'
import { ProtocolDescription } from './ProtocolDescription'

export const Salmon = () => {
  const name = 'Salmon'
  const description = (
    <>
      Salmon is an alignment-free method for estimating transcript abundances
      from RNA-Seq data. We use it in quasi-mapping mode, which is significantly
      faster than alignment-based approaches and requires us to build a Salmon
      transcriptome index. We build a custom reference transcriptome (using RSEM
      rsem-prepare-reference) by filtering the Ensembl genomic DNA assembly to
      remove pseudogenes, which we expect could negatively impact the
      quantification of protein-coding genes. This means we're obtaining
      abundance estimates for coding as well as non-coding transcripts. We
      include the flags <i>--seqBias</i> to correct for random hexamer priming
      and, if this is a paired-end experiment, <i>--gcBias</i> to correct for GC
      content when running <i>salmon quant</i>.{' '}
      <Anchor
        href={links.salmon_quant}
        label="Learn more"
        target="_blank"
        rel="noopener noreferrer"
      />
    </>
  )

  return <ProtocolDescription name={name} description={description} />
}

export default Salmon
