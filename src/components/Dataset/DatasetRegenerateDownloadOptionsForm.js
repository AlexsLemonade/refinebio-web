import { useState } from 'react'
import { Box, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import formatString from 'helpers/formatString'
import gtag from 'analytics/gtag'
import { options } from 'config'
import { Button } from 'components/shared/Button'
import { ExpandableBlock } from 'components/shared/ExpandableBlock'
import { DownloadOptionsForm } from 'components/Download/DownloadOptionsForm'

export const DatasetRegenerateDownloadOptionsForm = ({
  dataset,
  regeneratedDataset,
  setRegeneratedDataset,
  show
}) => {
  const {
    aggregate_by: aggregateBy,
    scale_by: scaleBy,
    quantile_normalize: quantileNormalize
  } = dataset
  const { createDataset, updateDataset } = useDatasetManager()
  const transformationOptions = options.transformation.reduce(
    (acc, cur) => ({ ...acc, [cur.value]: cur.label }),
    {}
  )
  const [openForm, setOpenForm] = useState(false)

  const handleRegenerateDataset = async (newDownloadOptions) => {
    const params = { data: regeneratedDataset.data, ...newDownloadOptions }
    const response = await updateDataset(await createDataset(), params)
    const pathname = `/dataset/${response.id}`

    gtag.trackRegeneratedDataset(
      dataset,
      JSON.stringify(dataset) !== JSON.stringify(regeneratedDataset)
        ? dataset
        : null
    )

    return pathname
  }

  const handleDownloadOptionsChanges = (newDownloadOption) => {
    setRegeneratedDataset((prev) => ({ ...prev, ...newDownloadOption }))
  }

  if (!show) return null

  return (
    <Box margin={{ bottom: 'small' }}>
      {!openForm && (
        <Box direction="row" gap="xlarge">
          <Text weight="bold">Aggregate by: {formatString(aggregateBy)}</Text>
          <Text weight="bold">
            Transformation: {transformationOptions[scaleBy]}
          </Text>
          {!quantileNormalize && (
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
          isProcessed // always true
          handleDownloadOptionsChanges={handleDownloadOptionsChanges}
          onSubmit={handleRegenerateDataset}
        />
      </ExpandableBlock>
    </Box>
  )
}
export default DatasetRegenerateDownloadOptionsForm
