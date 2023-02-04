import { useState } from 'react'
import { Box, CheckBox, Heading } from 'grommet'
import { Alert } from 'components/shared/Alert'
import { Anchor } from 'components/shared/Anchor'
import { Icon } from 'components/shared/Icon'
import { links } from 'config'

export const AdvancedOptionsBlock = ({ datasetId, toggle }) => {
  const [skip, setSkip] = useState(false)

  return (
    <Box
      margin={{ top: 'small' }}
      height="auto"
      style={{
        overflow: 'hidden',
        maxHeight: toggle ? '200px' : '0',
        transition: 'max-height .5s ease-in-out'
      }}
    >
      <Heading level={5} weight="500" margin={{ bottom: 'xsmall' }}>
        Advanced Options
      </Heading>

      <Box
        margin={{ bottom: 'xsmall' }}
        style={{
          overflow: 'hidden',
          maxHeight: skip ? '200px' : '0',
          transition: 'max-height .5s ease-in-out'
        }}
      >
        <Alert
          message="Skipping quantile normalization will make your dataset less comparable to other refine.bio data."
          dismissableKey={`skip_quantile_normalization_${datasetId}`}
        />
      </Box>

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
    </Box>
  )
}

export default AdvancedOptionsBlock
