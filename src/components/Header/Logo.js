import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import { LogoSvg } from '../../images/logo.svg'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  ${({ theme, light }) => css`
    color: ${light
      ? theme.global.colors.white
      : theme.global.colors['alex-navy']};
  `}
`

export const Logo = ({ light = false, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper light={light} {...props}>
      <LogoSvg />
    </Wrapper>
  )
}

export default Logo
