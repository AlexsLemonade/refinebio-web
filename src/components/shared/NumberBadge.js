import { Box } from 'grommet'
import styled, { css } from 'styled-components'

// NOTE: Set the prop 'light' to true for the dark background

const Badge = styled(Box)`
  align-item: center;
  border-radius: 24px;
  display: flex;
  font-size: 12px;
  min-width: max-content;
  padding: 3px 12px;
  position: absolute;
  top: -16px;
  right: -16px;
  text-align: center;
  z-index: 1;
  ${({ theme, light }) => css`
    background: ${light
      ? theme.global.colors.white
      : theme.global.colors.brand};
    color: ${light ? theme.global.colors.brand : theme.global.colors.white};
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
