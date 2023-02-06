import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Form } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { ShareDatasetButton } from 'components/Dataset'
import { AdvancedOptions, AdvancedOptionsButton } from './AdvancedOptions'
import { AggregateOptions } from './AggregateOptions'
import { TransformOptions } from './TransformOptions'

export const DownloadAdvancedOptions = () => {
  const router = useRouter()
  const { datasetId } = useDataset()
  const { setResponsive } = useResponsive()
  const [toggle, setToggle] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/download/?start=true')
  }

  return (
    <Box border={{ side: 'bottom' }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Heading
            level={2}
            margin={{ bottom: setResponsive('none', 'none', 'large') }}
            size={setResponsive('h2_small', 'h2_large')}
          >
            My Dataset
          </Heading>
          <ShareDatasetButton />
        </Row>
        <Row direction={setResponsive('column', 'column', 'row')}>
          <Box>
            <Row align={setResponsive('start', 'center')} justify="start">
              <AggregateOptions />
              <TransformOptions />
              <Box
                margin={{
                  top: setResponsive('xsmall', 'none'),
                  left: setResponsive('none', 'xsmall')
                }}
              >
                <AdvancedOptionsButton toggle={toggle} setToggle={setToggle} />
              </Box>
            </Row>
            <AdvancedOptions datasetId={datasetId} toggle={toggle} />
          </Box>
          <Button
            label="Download"
            primary
            responsive
            margin={{
              bottom: setResponsive('small', 'small', 'none')
            }}
            type="submit"
          />
        </Row>
      </Form>
    </Box>
  )
}

export default DownloadAdvancedOptions
