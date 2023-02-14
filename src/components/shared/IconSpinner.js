import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Spinner = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.global.colors.rgba_light_2};
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

export const IconSpinner = ({ size = sizes.small, ...props }) => {
  return (
    <Spinner
      width={sizes[size] || size}
      height={sizes[size] || size}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}
