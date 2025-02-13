import { Box, Text } from 'grommet'
import styled, { css } from 'styled-components'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/Row'

export const SuppliedProtocolList = styled(Box)`
  ${({ theme }) => css`
    > div:nth-of-type(odd) {
      background: ${theme.global.colors['gray-shade-5']};
    }
  `}
`

export const SuppliedProtocolItem = ({ field, value }) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      justify="start"
      pad={{
        horizontal: setResponsive('basex7', 'basex7', 'basex12'),
        vertical: 'small'
      }}
      margin={{ left: '-24px' }}
      style={{ maxWidth: 'none', width: 'calc(100% + 48px)' }}
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
        <Text>{value}</Text>
      </Box>
    </Row>
  )
}
