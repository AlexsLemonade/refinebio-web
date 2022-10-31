import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

/* NOTE: 
- Set the prop 'light' to true for the dark background
- Set the prop 'badge' to true for the badged button
*/

const CustomButton = styled(GrommetButton)`
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

export const Button = ({ ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box width="max-content" {...props}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CustomButton {...props} />
    </Box>
  )
}

export default Button
