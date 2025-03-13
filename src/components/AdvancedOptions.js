import { Box, Heading } from 'grommet'
import { Alert } from 'components/Alert'
import { Anchor } from 'components/Anchor'
import { CheckBox } from 'components/CheckBox'
import { ExpandableBlock } from 'components/ExpandableBlock'
import { Icon } from 'components/Icon'
import { links } from 'config'

export const AdvancedOptions = ({
  id,
  values: { aggregate_by: aggregateBy, quantile_normalize: quantileNormalize },
  toggle,
  handleChange,
  handleUpdateDownloadOptions = () => {},
  name = 'quantile_normalize',
  hideLabel = false
}) => {
  const skipQuantileNormalize = !quantileNormalize

  return (
    <ExpandableBlock
      expand={toggle}
      height="auto"
      margin={{ vertical: 'small' }}
    >
      {!hideLabel && (
        <Heading level={5} responsive={false} weight="500">
          Advanced Options
        </Heading>
      )}
      <ExpandableBlock
        expand={skipQuantileNormalize}
        margin={{ bottom: 'xsmall' }}
        opacity={0.5}
      >
        <Alert
          message="Skipping quantile normalization will make your dataset less comparable to other refine.bio data."
          dismissableKey={`skip_quantile_normalization_${id}`}
        />
      </ExpandableBlock>
      <Box direction="row">
        <Box>
          <CheckBox
            label="Skip quantile normalization for RNA-seq samples"
            name={name}
            checked={skipQuantileNormalize && aggregateBy === 'EXPERIMENT'}
            disabled={aggregateBy === 'SPECIES'}
            onChange={() => {
              handleUpdateDownloadOptions(name, !quantileNormalize)
              return handleChange({
                target: { name, value: !quantileNormalize }
              })
            }}
          />
        </Box>
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
