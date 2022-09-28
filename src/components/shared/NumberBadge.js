import { Box } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Badge = styled(Box)`
  border-radius: 30px;
  display: flex;
  align-item: center;
  font-size: 12px;
  position: absolute;
  top: -8px;
  right: -4px;
  text-align: center;
  vertical-align: middle;
  z-index: 1;
  ${({ theme, count, light }) => css`
    background: ${light
      ? theme.global.colors.white
      : theme.global.colors.brand};
    color: ${light ? theme.global.colors.brand : theme.global.colors.white};
    line-height: ${Number.isNaN(Number(count)) ? '12px' : '16px'};
    padding: ${Number.isNaN(Number(count)) ? '0 4px' : '0 2px'};
    height: ${Number.isNaN(Number(count)) ? '12px' : '16px'};
    min-width: ${Number.isNaN(Number(count)) ? 'max-content' : '16px'};
  `}
`

export const NumberBadge = ({ count = 0, light = false, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Badge light={light} count={count} {...props}>
      {count}
    </Badge>
  )
}

export default NumberBadge
