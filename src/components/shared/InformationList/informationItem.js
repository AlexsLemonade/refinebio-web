import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'

export const InformationItem = ({ field, value }) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      justify="start"
      margin={{ left: '-24px' }}
      pad={{
        horizontal: setResponsive('basex7', 'basex7', 'basex12'),
        vertical: 'small'
      }}
      width={{ min: 'calc(100% + 48px)', max: 'none' }}
    >
      <Box margin={{ right: 'medium' }} width={{ min: '192px' }}>
        <Text
          margin={{ bottom: setResponsive('xxsmall', 'xxsmall', 'none') }}
          textAlign={setResponsive('start', 'start', 'end')}
          weight="bold"
        >
          {field}
        </Text>
      </Box>
      <Box>
        <Text style={{ overflowWrap: 'break-word' }}>{value}</Text>
      </Box>
    </Row>
  )
}

export default InformationItem
