import { useState } from 'react'
import { Box, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { RadioButtonGroup } from 'components/shared/RadioButtonGroup'
import { Row } from 'components/shared/Row'

export const MoveToDatasetModal = ({ onAppend, onReplace, onCloseModal }) => {
  const { setResponsive } = useResponsive()
  const { dataset: myDataset, loading, getTotalSamples } = useDatasetManager()
  const myDatasetTotalSamples = formatNumbers(getTotalSamples(myDataset?.data))

  const radioOptions = [
    { label: 'Append samples to My Dataset', value: 'append' },
    { label: 'Replace samples in My Dataset', value: 'replace' }
  ]
  const defaultAction = radioOptions[0].value
  const [action, setAction] = useState(defaultAction)

  const handleMoveSamples = async () => {
    if (action === 'append') {
      onAppend()
    } else {
      onReplace()
    }
    gtag.trackDatasetAction(MoveToDatasetModal)
    onCloseModal()
  }

  const handleCancel = () => {
    setAction(defaultAction)
    onCloseModal()
  }

  return (
    <Box
      align="center"
      margin={{ bottom: 'medium' }}
      pad={{ bottom: 'small', horizontal: 'large' }}
      width={setResponsive('100%', '100%', '500px')}
    >
      <Box direction="row" gap="xsmall" margin={{ bottom: 'medium' }}>
        <Icon color="error" name="Warning" size="medium" />
        <Heading level={2} size="small">
          There are {myDatasetTotalSamples} samples in{' '}
          <Anchor href="/download" label="My Dataset" target="_blank" />
        </Heading>
      </Box>
      <Box
        margin={{ bottom: 'large' }}
        width={{ max: setResponsive('100%', '100%', '260px') }}
      >
        <RadioButtonGroup
          options={radioOptions}
          name="move-to-dataset"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        />
      </Box>
      <Row justify="center" gap="small" width="100%">
        <Button label="Cancel" secondary responsive onClick={handleCancel} />
        <Button
          label="Move Samples"
          isLoading={loading}
          primary
          responsive
          onClick={handleMoveSamples}
        />
      </Row>
    </Box>
  )
}

export default MoveToDatasetModal
