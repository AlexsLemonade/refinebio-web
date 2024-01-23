import { useRouter } from 'next/router'
import { Box, Heading } from 'grommet'
import gtag from 'api/analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { RadioButtonGroup } from 'components/shared/RadioButtonGroup'
import { Row } from 'components/shared/Row'

export const MoveToDatasetModal = ({
  id,
  closeModal,
  defaultValue,
  dataset,
  pathname,
  radioOptions,
  value,
  setValue
}) => {
  const {
    dataset: datasetState,
    loading,
    addSamples,
    getTotalSamples,
    replaceSamples
  } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { push } = useRouter()
  const totalSamples = formatNumbers(getTotalSamples(datasetState.data))
  const newDatasetTotalSamples = formatNumbers(getTotalSamples(dataset.data))

  const handleMoveSamples = async (action = 'append') => {
    const GAEvent = (text) => gtag.myDatasetAction(`${text} Samples`)

    if (action === 'append') {
      await addSamples(dataset.data)
      GAEvent('Append')
      push(
        {
          pathname,
          query: {
            message: `Appended ${newDatasetTotalSamples} samples to My Dataset`,
            status: 'success'
          }
        },
        pathname
      )
    } else {
      await replaceSamples(dataset.data)
      GAEvent('Replace')
      push(
        {
          pathname,
          query: {
            message: `Moved  ${newDatasetTotalSamples} samples to My Dataset`,
            status: 'success'
          }
        },
        pathname
      )
    }
    closeModal(id)
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
          There are {totalSamples} samples in{' '}
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
          isLoading={loading}
          primary
          responsive
          onClick={() => handleMoveSamples(value)}
        />
      </Row>
    </Box>
  )
}

export default MoveToDatasetModal
