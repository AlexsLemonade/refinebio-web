import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Spinner = styled(Box)`
  ${({ theme, datk }) => css`
    border: 1px solid
      ${datk ? theme.global.colors.rgbaLight2 : theme.global.colors.brand};
    border-radius: 100% !important;
    border-top-color: ${theme.global.colors.white};
    display: inline-block;
    animation: spin 1s linear infinite;
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `}
`

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px'
}

export const IconSpinner = ({ size = sizes.small, dark = false, ...props }) => {
  return (
    <Spinner
      dark={dark}
      width={sizes[size] || size}
      height={sizes[size] || size}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}
