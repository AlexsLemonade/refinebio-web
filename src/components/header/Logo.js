import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import { LogoSvg } from '../../images/logo.svg'

// NOTE: Add class name 'light' for the dark background

const Wrapper = styled(Box)`
  ${({ theme }) => css`
    color: ${theme.global.colors['alex-navy']};
    &.light {
      color: ${theme.global.colors.white};
    }
  `}
`

export const Logo = ({ ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper {...props}>
      <LogoSvg />
    </Wrapper>
  )
}

export default Logo
