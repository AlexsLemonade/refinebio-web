import { useResponsive } from 'hooks/useResponsive'
import { Box, Text } from 'grommet'
import { Button as SharedButton } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import styled, { css } from 'styled-components'

const Button = styled(SharedButton)`
  ${({ theme }) =>
    css`
      &:hover,
      &:focus {
        border: 1px solod ${theme.global.colors.brand};
        box-shadow: none;
        outline: none;
      }
    `}
`

export const AdvancedOptionsButton = ({ toggle, setToggle }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      margin={{ top: setResponsive('small', 'none') }}
      onClick={() => setToggle(!toggle)}
    >
      <Box align="center" direction="row">
        <Button
          aria-controls="nav-menu"
          aria-expanded={toggle}
          aria-haspopup="true"
          color="brand"
          gap="none"
          label="Advanced Options"
          margin={{
            left: setResponsive('none', 'medium'),
            right: 'xsmall'
          }}
          style={{ padding: '0' }}
        />
        <Text color="brand">
          {toggle ? (
            <Icon name="ChevronUp" size="xsmall" />
          ) : (
            <Icon name="ChevronDown" size="xsmall" />
          )}
        </Text>
      </Box>
    </Box>
  )
}

export default AdvancedOptionsButton