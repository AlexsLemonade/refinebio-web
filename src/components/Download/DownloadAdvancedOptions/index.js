import { useState } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { ShareDatasetButton } from 'components/Dataset'
import { AdvancedOptionsBlock } from './AdvancedOptionsBlock'
import { AdvancedOptionsButton } from './AdvancedOptionsButton'
import { AggregateDropDown } from './AggregateDropDown'
import { TransformDropDown } from './TransformDropDown'

export const DownloadAdvancedOptions = () => {
  const { setResponsive } = useResponsive()
  const [toggle, setToggle] = useState(false)
  const { datasetId } = useDataset()

  return (
    <Box>
      <Row>
        <Heading
          level={2}
          margin={{ bottom: 'small' }}
          size={setResponsive('h2_small', 'h2_large')}
        >
          My Dataset
        </Heading>
        <ShareDatasetButton />
      </Row>
      <Row direction={setResponsive('column', 'column', 'row')}>
        <Box>
          <Row align="center" justify="start">
            <AggregateDropDown />
            <TransformDropDown />
            <Box
              margin={{
                top: setResponsive('xsmall', 'none'),
                left: setResponsive('none', 'xsmall')
              }}
            >
              <AdvancedOptionsButton toggle={toggle} setToggle={setToggle} />
            </Box>
          </Row>
          <AdvancedOptionsBlock datasetId={datasetId} toggle={toggle} />
        </Box>
        <Button
          label="Download"
          primary
          responsive
          margin={{ top: setResponsive('medium', 'medium', 'none') }}
        />
      </Row>
    </Box>
  )
}

export default DownloadAdvancedOptions
