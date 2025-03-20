import { memo } from 'react'
import { Box, Text } from 'grommet'
import { cache, links } from 'config'
import { Anchor } from 'components/Anchor'

import { DatasetActionButton } from 'components/shared/DatasetActionButton'
import { Icon } from 'components/Icon'

export const SamplesTableAddRemoveCell = ({
  experimentAccessionCodes,
  sample
}) => {
  // maps the given sample accession code to its corresponding experiment accession code
  // (as the dataset.data structure) to support adding/removing samples via API
  // e.g., { experimentAccession: [ sampleAccession ]}
  const datasetData = experimentAccessionCodes
    .filter((experimentAccessionCode) =>
      sample.experiment_accession_codes.includes(experimentAccessionCode)
    )
    .reduce(
      (acc, experimentAccessionCode) => ({
        ...acc,
        [experimentAccessionCode]: [sample.accession_code]
      }),
      {}
    )

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

  return <DatasetActionButton data={datasetData} label="Add" secondary />
}

export default memo(SamplesTableAddRemoveCell)
