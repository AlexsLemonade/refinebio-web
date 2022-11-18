import { Box, Text, TextInput as GrommetTextInput } from 'grommet'
import { normalizeColor } from 'grommet/utils'
import { Icon } from 'components/shared/Icon'
import { form } from 'themes/variables'
import styled, { css } from 'styled-components'

const CustomInput = styled(GrommetTextInput)`
  ${({ theme, error }) =>
    error &&
    css`
      border-color: ${theme.global.colors.error};
      color: ${theme.global.colors.black};
      &:hover,
      &:focus-visible {
        border-color: ${theme.global.colors.error};
        box-shadow: ${form.BOXSHADOW_CUSTOM(normalizeColor('error', theme))};
      }
    `}
`

export const TextInput = ({ error = false, ...props }) => {
  return (
    <Box style={{ position: 'relative' }}>
      {error && (
        <Text
          focusable="false"
          style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            zIndex: '1'
          }}
        >
          <Icon color="coral-shade-20" name="Warning" size="small" />
        </Text>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CustomInput error={error} {...props} />
    </Box>
  )
}

export default TextInput
