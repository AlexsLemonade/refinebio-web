import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

export const Badge = styled(Box)`
  ${({ theme, count, light }) => css`
    background: ${light
      ? theme.global.colors.white
      : theme.global.colors.brand};
    border-radius: 30px;
    color: ${light ? theme.global.colors.brand : theme.global.colors.white};
    display: flex;
    align-item: center;
    font-size: 12px;
    line-height: 16px;
    padding: ${Number.isNaN(Number(count)) ? '0 4px' : 0};
    position: absolute;
    top: -8px;
    right: -4px;
    height: 16px;
    min-width: 16px;
    text-align: center;
    vertical-align: middle;
    z-index: 1;
  `}
`

export const BadgedButton = ({ count = 0, light = false, ...props }) => {
  return (
    <Box style={{ position: 'relative' }}>
      <Badge light={light} count={count}>
        {count}
      </Badge>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetButton {...props} />
    </Box>
  )
}

export default BadgedButton
