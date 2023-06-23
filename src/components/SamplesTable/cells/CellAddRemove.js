import { memo } from 'react'
import apiData from 'api/api_data.json'
import { links } from 'config'
import { Box, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'

// TODO: add/remove implementation once complete the dataset implementation
export const CellAddRemove = ({ experimentAccessionCodes, sample }) => {
  // creates a dataset slice with all of the experiments that are referring this sample
  // in order to update all of the experiments when it's added or removed
  // eslint-disable-next-line no-unused-vars
  const datasetSlice = experimentAccessionCodes.reduce(
    (result, accessionCode) => {
      const temp = { ...result }
      temp[accessionCode] = [sample.accession_code]

      return temp
    },
    {}
  )

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

  return <Button label="Add" secondary />
}

export default memo(CellAddRemove)
