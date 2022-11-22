import { Box } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { SrOnly } from 'components/shared/SrOnly'
import { LogoSvg } from '../../images/logo.svg'

// NOTE: Set the prop 'light' to true for the dark background

export const Logo = ({ clickHandler, light = false }) => {
  return (
    <Box light={light}>
      <Anchor
        color={light ? 'white' : 'alex-navy'}
        href="/"
        underline={false}
        style={{ lineHeight: 0 }}
        onClick={clickHandler}
      >
        <LogoSvg role="img" title="refine.bio" />
        <SrOnly label="Go to refine.bio homepage " />
      </Anchor>
    </Box>
  )
}

export default Logo
