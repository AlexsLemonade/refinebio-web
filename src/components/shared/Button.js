import { Box, Button as GrommetButton } from 'grommet'
import styled, { css } from 'styled-components'

/* NOTE: 
- Set the prop 'light' to true for the dark background
- Set the prop 'badge' to true for the badged button
*/

const PrimaryLight = styled(GrommetButton)`
  ${({ theme }) => css`
    background: ${theme.global.colors.white};
    border-color: ${theme.global.colors.white};
    color: ${theme.global.colors.brand};
    &:hover {
      background: ${theme.global.colors['alex-navy-tint-90']};
      border-color: ${theme.global.colors['alex-navy-tint-90']};
      color: ${theme.global.colors.brand};
    }
  `}
`

const SecondaryLight = styled(GrommetButton)`
  ${({ theme }) => css`
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

export const Button = ({ light = false, ...props }) => {
  return (
    <Box width="max-content">
      {/* eslint-disable-next-line no-nested-ternary */}
      {light && props.primary ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <PrimaryLight {...props} />
      ) : light && props.secondary ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SecondaryLight {...props} />
      ) : (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <GrommetButton {...props} />
      )}
    </Box>
  )
}

export default Button
