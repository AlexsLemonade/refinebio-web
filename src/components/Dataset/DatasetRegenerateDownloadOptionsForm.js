import { useState } from 'react'
import { Box, Text } from 'grommet'
import getReadable from 'helpers/getReadable'
import { Button } from 'components/Button'
import { DownloadOptionsForm } from 'components/DownloadOptionsForm'
import { ExpandableBlock } from 'components/ExpandableBlock'

export const DatasetRegenerateDownloadOptionsForm = ({
  dataset,
  regeneratedDataset,
  setRegeneratedDataset
}) => {
  const [openForm, setOpenForm] = useState(false)

  const changeDownloadOptions = (newDownloadOption) => {
    setRegeneratedDataset((prev) => ({ ...prev, ...newDownloadOption }))
  }

  return (
    <Box margin={{ bottom: 'small' }}>
      {!openForm && (
        <Box direction="row" gap="xlarge">
          <Text weight="bold">
            Aggregate by: {getReadable(dataset.aggregate_by)}
          </Text>
          <Text weight="bold">
            Transformation: {getReadable(dataset.scale_by)}
          </Text>
          {!dataset.quantile_normalize && (
            <Text weight="bold">
              Quantile Normalization Skipped for RNA-seq samples
            </Text>
          )}
          <Text weight="bold">
            <Button
              label="Change"
              link
              linkFontSize="16px"
              onClick={() => setOpenForm(true)}
            />
          </Text>
        </Box>
      )}

      {regeneratedDataset && (
        <ExpandableBlock duration="1.2s" expand={openForm}>
          <DownloadOptionsForm
            dataset={regeneratedDataset}
            buttonLabel="Regenerate Dataset"
            onOptionsChange={changeDownloadOptions}
          />
        </ExpandableBlock>
      )}
    </Box>
  )
}
export default DatasetRegenerateDownloadOptionsForm
