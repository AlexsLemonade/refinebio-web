import { Box, Button as GrommetButton, Text } from 'grommet'
import styled, { css } from 'styled-components'

export const BadgedButton = ({ count = 0, light = false, ...props }) => {
  const Wrapper = styled(Box)`
    ${({ theme }) => css`
      position: relative;
      //   > button:hover,
      //   > button:focus-visible {
      //     + div {
      //       background: ${theme.global.colors['brand-tint-20']};
      //     }
      //   }
    `}
  `
  const Badge = styled(Box)`
    ${({ theme }) => css`
      background: ${light
        ? theme.global.colors.white
        : theme.global.colors.brand};
      border-radius: 50%;
      color: ${light ? theme.global.colors.brand : theme.global.colors.white};
      display: flex;
      align-item: center;
      font-size: 12px;
      line-height: 16px;
      position: absolute;
      top: -8px;
      right: -4px;
      height: 16px;
      width: 16px;
      text-align: center;
      vertical-align: middle;
      z-index: 1;
    `}
  `
  return (
    <Wrapper>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetButton {...props} />
      <Badge>{count}</Badge>
    </Wrapper>
  )
}

export default BadgedButton
