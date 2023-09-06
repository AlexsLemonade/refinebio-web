import { memo } from 'react'
import { Box, Text } from 'grommet'
import apiData from 'api/api_data.json'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { Icon } from 'components/shared/Icon'

// TODO: finalize the implementation once the dataset manager (addSample/removeSample) is completed
export const AddRemoveCell = ({ experimentAccessionCodes, sample }) => {
  // creates a dataset slice with all of the experiments that are referring this sample
  // in order to update all of the experiments when it's added or removed
  const data = experimentAccessionCodes.reduce((result, accessionCode) => {
    const temp = { ...result }
    temp[accessionCode] = [sample.accession_code]

    return temp
  }, {})

  // ensures the samples have qn targets associated
  if (
    !sample.is_processed ||
    (apiData.qnTargets && !apiData.qnTargets[sample.organism.name])
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
