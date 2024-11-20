import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'

export const InformationItem = ({
  field,
  value,
  fallback = 'N/A',
  forceFallback = false // sets to true when you want to ignore the value prop
}) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      justify="start"
      pad={{
        horizontal: setResponsive('basex7', 'basex7', 'basex12'),
        vertical: 'small'
      }}
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
        {value && !forceFallback ? (
          <Text style={{ overflowWrap: 'break-word' }}>{value}</Text>
        ) : (
          <TextNull text={fallback} />
        )}
      </Box>
    </Row>
  )
}

export default InformationItem
