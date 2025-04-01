import styled, { css } from 'styled-components'
import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { BoxBlock } from 'components/BoxBlock'
import { Row } from 'components/Row'
import { TextNull } from 'components/TextNull'

export const InformationList = styled(BoxBlock)`
  ${({ theme }) => css`
    > div:nth-of-type(odd) {
      background: ${theme.global.colors['gray-shade-5']};
    }
  `}
`

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
