import { getTitle } from 'utils/getTitle'
import { Box, Heading, Paragraph } from 'grommet'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'

const ModalContent = () => (
  <Box>
    <Heading margin={{ bottom: 'small' }} level={1}>
      Processing Information
    </Heading>
    <Box margin={{ bottom: 'small' }}>
      <Pill label="refine.bio processed" status="success" />
    </Box>

    <Heading level={3}>Salmon</Heading>
    <Paragraph>
      Salmon is an alignment-free method for estimating transcript abundances
      from RNA-Seq data. We use it in quasi-mapping mode, which is significantly
      faster than alignment-based approaches and requires us to build a Salmon
      transcriptome index. We build a custom reference transcriptome (using RSEM
      rsem-prepare-reference) by filtering the Ensembl genomic DNA assembly to
      remove pseudogenes, which we expect could negatively impact the
      quantification of protein-coding genes. This means we're obtaining
      abundance estimates for coding as well as non-coding transcripts. We
      include the flags --seqBias to correct for random hexamer priming and, if
      this is a paired-end experiment, --gcBias to correct for GC content when
      running
    </Paragraph>
    <Paragraph>
      All samples available for download will be{' '}
      <strong>quantile normalized</strong>. For more information regarding how
      quantile normalization is performed and its limitations, see our
      documentation.
    </Paragraph>
  </Box>
)

export default {
  title: getTitle('Modal'),
  component: Modal,
  args: {
    label: 'Open Modal',
    children: <ModalContent />
  }
}

const Template = (args) => <Modal {...args} />

export const Default = Template.bind({})
Default.storyName = 'Modal'
