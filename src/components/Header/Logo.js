import { Anchor, Box } from 'grommet'
import { SrOnly } from 'components/shared/SrOnly'
import styled, { css } from 'styled-components'
import { LogoSvg } from '../../images/logo.svg'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  ${({ theme, light }) => css`
  a {
    line-height: 0;
    color: ${
      light ? theme.global.colors.white : theme.global.colors['alex-navy']
    };
  `}
  } 
`

export const Logo = ({ light = false, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper light={light} {...props}>
      <Anchor href="/">
        <LogoSvg role="img" />
        <SrOnly>Go to refine.bio homepage</SrOnly>
      </Anchor>
    </Wrapper>
  )
}

export default Logo
