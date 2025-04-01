import { Box } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/Anchor'
import { SrOnly } from 'components/SrOnly'
import { GithubLogoSvg } from '../images/github-corner.svg'

// NOTE: Set the prop 'light' to true for the dark background
export const GithubLogoAnchor = ({ light = false }) => {
  return (
    <Box light={light}>
      <Anchor color={light ? 'white' : 'alex-navy'} href={links.alsf_github}>
        <GithubLogoSvg role="img" title="Github ALSF Repository" />
        <SrOnly label="Go to Github ALSF Repository" />
      </Anchor>
    </Box>
  )
}

export default GithubLogoAnchor
