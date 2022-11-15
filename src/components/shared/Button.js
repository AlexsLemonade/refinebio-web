import { useResponsive } from 'hooks/useResponsive'
import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

/* NOTE: 
- Set the prop 'light' to true for the dark background
- Set the prop 'badge' to true for the badged button
*/

const Wrapper = styled(Box)`
  ${({ responsive, viewport }) =>
    responsive &&
    css`
      width: ${viewport !== 'small' ? 'max-content' : '100%'};
    `}
`

const CustomButton = styled(GrommetButton)`
  ${({ uppercase }) =>
    uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${({ large, viewport }) =>
    large &&
    css`
      font-size: ${viewport !== 'small' ? '20px' : '16px'};
      padding: ${viewport !== 'small' ? '16px 32px' : '4px 24px'};
    `}  
  ${({ theme, light, primary }) =>
    primary &&
    light &&
    css`
      background: ${theme.global.colors.white};
      border-color: ${theme.global.colors.white};
      color: ${theme.global.colors.brand};
      &:hover {
        background: ${theme.global.colors['alex-navy-tint-90']};
        border-color: ${theme.global.colors['alex-navy-tint-90']};
        color: ${theme.global.colors.brand};
      }
    `}

  ${({ theme, light, secondary }) =>
    secondary &&
    light &&
    css`
      background: none;
      border-color: ${theme.global.colors.white};
      color: ${theme.global.colors.white};
      &:hover {
        background: ${theme.global.colors.white};
        border-color: ${theme.global.colors.white};
        color: ${theme.global.colors.brand};
      }
    `}
`

export const Button = ({
  btnWidth,
  large = false,
  responsive = false,
  uppercase = false,
  ...props
}) => {
  const { viewport } = useResponsive()
  return (
    <Wrapper
      responsive={responsive}
      width={btnWidth || 'max-content'}
      viewport={viewport}
    >
      <CustomButton
        btnWidth={btnWidth}
        large={large}
        uppercase={uppercase}
        viewport={viewport}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Wrapper>
  )
}

export default Button
