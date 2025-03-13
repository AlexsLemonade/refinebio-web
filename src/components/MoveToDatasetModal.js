import { Box, Form, Heading } from 'grommet'

import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import { Anchor } from 'components/Anchor'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { RadioButtonGroup } from 'components/RadioButtonGroup'
import { Row } from 'components/Row'

export const MoveToDatasetModal = ({ value, onChange, onReset, onSubmit }) => {
  const { setResponsive } = useResponsive()
  const { myDataset, loading, getTotalSamples } = useDatasetManager()

  const myDatasetTotalSamples = formatNumbers(getTotalSamples(myDataset.data))
  const radioOptions = [
    { label: 'Append samples to My Dataset', value: 'append' },
    { label: 'Replace samples in My Dataset', value: 'replace' }
  ]

  return (
    <Form onReset={onReset} onSubmit={onSubmit}>
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
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Box>
        <Row justify="center" gap="small" width="100%">
          <Button type="reset" label="Cancel" secondary responsive />
          <Button
            type="submit"
            label="Move Samples"
            isLoading={loading}
            primary
            responsive
          />
        </Row>
      </Box>
    </Form>
  )
}

export default MoveToDatasetModal
