import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import { AdvanedOptionsCheckBox } from './AdvanedOptionsCheckBox'
import { AdvancedOptionsButton } from './AdvancedOptionsButton'
import { AggregateOptions } from './AggregateOptions'
import { TransformationOptions } from './TransformationOptions'

export const AdvancedOptions = () => {
  const router = useRouter()
  const { datasetId } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const [toggle, setToggle] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push('/download/?start=true')
  }

  return (
    <Box border={{ side: 'bottom' }}>
      <Form onSubmit={handleSubmit}>
        <Row direction={setResponsive('column', 'column', 'row')}>
          <Box>
            <Row align={setResponsive('start', 'center')} justify="start">
              <AggregateOptions />
              <TransformationOptions />
              <Box
                margin={{
                  top: setResponsive('xsmall', 'none'),
                  left: setResponsive('none', 'xsmall')
                }}
              >
                <AdvancedOptionsButton toggle={toggle} setToggle={setToggle} />
              </Box>
            </Row>
            <AdvanedOptionsCheckBox datasetId={datasetId} toggle={toggle} />
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

export default AdvancedOptions