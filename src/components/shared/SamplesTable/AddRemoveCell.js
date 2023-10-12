import { memo } from 'react'
import { Box, Text } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { Icon } from 'components/shared/Icon'
import cache from 'api/api_data.json' // TEMP mock for the API cache

export const AddRemoveCell = ({ experimentAccessionCodes, sample }) => {
  // creates an object with the experiment that containe this sample
  // in order to update it when it's added or removed
  // e.g., { experimentAccession: [ sampleAccessions ]}
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

  return (
    <DatasetActionButton
      btnType="secondary"
      data={data}
      label="Add"
      secondary
    />
  )
}

export default memo(AddRemoveCell)
