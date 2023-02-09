import { useState } from 'react'
import { Box, CheckBox, Heading } from 'grommet'
import { Alert } from 'components/shared/Alert'
import { Anchor } from 'components/shared/Anchor'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'

export const AdvancedOptions = ({ datasetId, toggle }) => {
  const [skip, setSkip] = useState(false)

  return (
    <ExpandableBlock
      expand={toggle}
      height="auto"
      margin={{ vertical: 'small' }}
    >
      <Heading level={5} weight="500">
        Advanced Options
      </Heading>
      <ExpandableBlock
        expand={skip}
        margin={{ bottom: 'xsmall' }}
        opacity={0.5}
      >
        <Alert
          message="Skipping quantile normalization will make your dataset less comparable to other refine.bio data."
          dismissableKey={`skip_quantile_normalization_${datasetId}`}
        />
      </ExpandableBlock>
      <Box direction="row">
        <CheckBox
          label="Skip quantile normalization for RNA-seq samples"
          onClick={() => setSkip(!skip)}
        />
        <Anchor
          href={links.refinebio_docs_quantile_normalization_rna_seq_samples}
          title="What does it mean to skip quantile normalization for RNA-seq samples?"
          target="_blank"
          rel="noopener noreferrer"
          margin={{ left: 'xxsmall' }}
        >
          <Icon name="Help" size="small" />
        </Anchor>
      </Box>
    </ExpandableBlock>
  )
}

export default AdvancedOptions
