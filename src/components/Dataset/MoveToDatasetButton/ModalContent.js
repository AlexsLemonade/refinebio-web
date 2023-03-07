import { useDataset } from 'hooks/useDataset'
import { useRouter } from 'next/router'
import { formatNumbers } from 'helpers/formatNumbers'
import { getTotalSamples } from 'helpers/dataset'
import { Box, Heading, RadioButtonGroup } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { Row } from 'components/shared/Row'

export const ModalContent = ({
  defaultValue,
  dataset,
  radioOptions,
  value,
  closeModal,
  setValue
}) => {
  const { addSamples, replaceSamples } = useDataset()

  const router = useRouter()
  const moveToDataSet = async (action = 'append') => {
    if (action === 'append') {
      console.log(dataset)
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
    }
  }

  const handleClose = () => {
    setValue(defaultValue)
    closeModal()
  }

  return (
    <Box
      align="center"
      margin={{ bottom: 'medium' }}
      pad={{ bottom: 'small', horizontal: 'large' }}
      width="625px"
    >
      <Box direction="row" gap="xsmall" margin={{ bottom: 'medium' }}>
        <Icon color="error" name="Warning" size="medium" />
        <Heading level={2} size="h2_small">
          There are {formatNumbers(getTotalSamples(dataset.data))} samples in{' '}
          <Anchor href="/download" label="My Dataset" target="_blank" />
        </Heading>
      </Box>
      <Box margin={{ bottom: 'large' }} width={{ max: '260px' }}>
        <RadioButtonGroup
          options={radioOptions}
          name="move-to-dataset"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      <Row justify="start" gap="small">
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

export default ModalContent
