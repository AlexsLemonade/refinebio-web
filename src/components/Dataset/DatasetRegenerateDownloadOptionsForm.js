import { useState } from 'react'
import { Box, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import gtag from 'analytics/gtag'
import getReadable from 'helpers/getReadable'
import { Button } from 'components/shared/Button'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { DownloadOptionsForm } from 'components/Download/DownloadOptionsForm'

export const DatasetRegenerateDownloadOptionsForm = ({
  dataset,
  regeneratedDataset,
  setRegeneratedDataset
}) => {
  const { createDataset, updateDataset } = useDatasetManager()
  const [openForm, setOpenForm] = useState(false)

  const handleRegenerateDataset = async (newDownloadOptions) => {
    const params = { data: regeneratedDataset.data, ...newDownloadOptions }
    const response = await updateDataset(await createDataset(), params)
    const pathname = `/dataset/${response.id}`

    gtag.trackRegeneratedDataset(dataset, response)

    return pathname
  }

  const handleDownloadOptionsChanges = (newDownloadOption) => {
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
      <ExpandableBlock duration="1.2s" expand={openForm}>
        <DownloadOptionsForm
          dataset={regeneratedDataset}
          buttonLabel="Regenerate Dataset"
          handleDownloadOptionsChanges={handleDownloadOptionsChanges}
          onSubmit={handleRegenerateDataset}
        />
      </ExpandableBlock>
    </Box>
  )
}
export default DatasetRegenerateDownloadOptionsForm
