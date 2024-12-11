import { memo } from 'react'
import { Box, Text } from 'grommet'
import { cache, links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { Icon } from 'components/shared/Icon'

export const AddRemoveCell = ({ experimentAccessionCodes, sample }) => {
  // maps the experiment accession codes to the sample accession codes
  // to perform add or remove actions
  // e.g., { experimentAccession: [ sampleAccession ]}
  const data = experimentAccessionCodes.reduce((acc, accessionCode) => {
    acc[accessionCode] = [sample.accession_code]

    return acc
  }, {})

  // ensures the samples have qn targets associated
  if (
    !sample.is_processed ||
    (cache.qnTargets && !cache.qnTargets[sample.organism.name])
  ) {
    return (
      <Box direction="row" gap="xsmall">
        <Icon name="Info" color="info" />
        <Box>
          <Text>Sample not processed</Text>
          <Anchor
            href={
              links.refinebio_docs_why_can_I_add_certain_samples_to_my_dataset
            }
            label="Learn more"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Box>
      </Box>
    )
  }

  return <DatasetActionButton data={data} label="Add" secondary />
}

export default memo(AddRemoveCell)
