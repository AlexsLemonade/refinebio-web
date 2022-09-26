import { Box, Text, TextInput as GrommetTextInput } from 'grommet'
import styled, { css } from 'styled-components'
import Warning from '../../images/warning.svg'

const InputWrapper = styled(Box)`
  position: relative;
  ${({ theme, error }) => css`
    background-color: ${theme.global.colors.white};
    color: ${error ? theme.global.colors.coral : 'inherit'};
  `};
`

export const Input = ({ error = false, ...props }) => {
  return (
    <InputWrapper error={error}>
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
      <GrommetTextInput {...props} className={error ? 'error' : ''} />
    </InputWrapper>
  )
}
