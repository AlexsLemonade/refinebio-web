import { Box } from 'grommet'
import gtag from 'api/analytics/gtag'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { SrOnly } from 'components/shared/SrOnly'
import { GithubLogoSvg } from '../../images/github-corner.svg'

// NOTE: Set the prop 'light' to true for the dark background
export const GithubAnchor = ({ light = false }) => {
  return (
    <Box light={light}>
      <Anchor
        color={light ? 'white' : 'alex-navy'}
        href={links.alsf_github}
        onClick={() =>
          gtag.outboundClick(links.alsf_github, 'Github Icon - Header')
        }
      >
        <GithubLogoSvg role="img" title="Github ALSF Repository" />
        <SrOnly label="Go to Github ALSF Repository" />
      </Anchor>
    </Box>
  )
}

export default GithubAnchor
