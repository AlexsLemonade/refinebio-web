import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Badge = styled(Box)`
  ${({ theme, count, light }) => css`
    background: ${light
      ? theme.global.colors.white
      : theme.global.colors.brand};
    border-radius: 30px;
    color: ${light ? theme.global.colors.brand : theme.global.colors.white};
    display: flex;
    align-item: center;
    font-size: 12px;
    line-height: ${Number.isNaN(Number(count)) ? '12px' : '16px'};
    padding: ${Number.isNaN(Number(count)) ? '0 4px' : 0};
    position: absolute;
    top: -8px;
    right: -4px;
    height: ${Number.isNaN(Number(count)) ? '12px' : '16px'};
    width: ${Number.isNaN(Number(count)) ? 'max-content' : '16px'};
    text-align: center;
    vertical-align: middle;
    z-index: 1;
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
