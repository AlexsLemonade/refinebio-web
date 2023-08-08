import { useRouter } from 'next/router'
import { Box, Heading, RadioButtonGroup } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { getTotalSamples } from 'helpers/dataset'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'

export const MoveToDatasetModal = ({
  id,
  defaultValue,
  dataset,
  radioOptions,
  value,
  closeModal,
  setValue
}) => {
  const { addSamples, replaceSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const router = useRouter()
  const moveToDataSet = async (action = 'append') => {
    if (action === 'append') {
      await addSamples(dataset.data)
      router.push(
        {
          pathname: '/download',
          query: {
            message: `Appended ${formatNumbers(
              getTotalSamples(dataset.data)
            )} samples to My Dataset`,
            status: 'success'
          }
        },
        '/download'
      )
      closeModal(id)
    } else {
      await replaceSamples(dataset.data)
      router.push(
        {
          pathname: '/download',
          query: {
            message: `Moved  ${formatNumbers(
              getTotalSamples(dataset.data)
            )} samples to My Dataset`,
            status: 'success'
          }
        },
        '/download'
      )
      closeModal(id)
    }
  }

  const handleClose = () => {
    setValue(defaultValue)
    closeModal(id)
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
          There are {formatNumbers(getTotalSamples(dataset.data))} samples in{' '}
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      <Row justify="center" gap="small" width="100%">
        <Button label="Cancel" secondary responsive onClick={handleClose} />
        <Button
          label="Move Samples"
          primary
          responsive
          onClick={() => moveToDataSet(value)}
        />
      </Row>
    </Box>
  )
}

export default MoveToDatasetModal
