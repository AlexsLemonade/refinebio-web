import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import { LogoSvg } from '../../images/logo.svg'

// NOTE: Set the prop 'light' to true for the dark background

const Wrapper = styled(Box)`
  ${({ theme }) => css`
    color: ${theme.global.colors['alex-navy']};
    &.light {
      color: ${theme.global.colors.white};
    }
  `}
`

export const Logo = ({ light = false, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper className={light ? 'light' : ''} {...props}>
      <LogoSvg />
    </Wrapper>
  )
}

export default Logo
