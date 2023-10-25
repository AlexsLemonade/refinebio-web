import { Box, TextInput as GrommetTextInput } from 'grommet'
import styled, { css } from 'styled-components'
import { InlineMessage } from 'components/shared/InlineMessage'

const CustomInput = styled(GrommetTextInput)`
  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.global.colors.error};
      color: ${theme.global.colors.black};
      &:hover,
      &:focus-visible {
        border-color: ${theme.global.colors.error};
        box-shadow: 0 0 1px 1px ${theme.global.colors.error};
      }
    `}
`

export const TextInput = ({ error = false, errorText = '', ...props }) => {
  return (
    <Box style={{ position: 'relative' }} width="100%">
      {error && (
        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          <InlineMessage
            color="error"
            height="16px"
            justify="center"
            label={errorText}
            iconSize="small"
            style={{ position: 'absolute', top: '-20px' }}
          />
        </Box>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CustomInput error={error} {...props} />
    </Box>
  )
}

export default TextInput
