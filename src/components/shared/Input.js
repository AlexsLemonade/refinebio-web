import { Box, Text, TextInput as GrommetTextInput } from 'grommet'
import { normalizeColor } from 'grommet/utils'
import { form } from 'themes/variables'
import styled, { css } from 'styled-components'
import Warning from '../../images/warning.svg'

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

export const Input = ({ error = false, ...props }) => {
  return (
    <Box style={{ position: 'relative' }}>
      {error && (
        // TODO: Create Icon component
        <Text color="coral-shade-20">
          <Warning
            role="presentation"
            aria-hidden="true"
            focusable="false"
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              transform: 'scale(.65)',
              zIndex: '1'
            }}
          />
        </Text>
      )}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <CustomInput error={error} {...props} />
    </Box>
  )
}
