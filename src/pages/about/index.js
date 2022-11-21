import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { AboutCCDL } from './AboutCCDL'
import { AboutHero } from './AboutHero'
import { AboutOverview } from './AboutOverview'

const About = () => {
  const { setResponsive } = useResponsive()
  const PAGE_PADDING = '120px'

  return (
    <>
      <Box
        pad={{
          top: 'basex10',
          bottom: setResponsive('xxxlarge', 'xxxlarge', 'basex9')
        }}
      >
        <FixedContainer
          pad={{ horizontal: setResponsive('large', 'medium', PAGE_PADDING) }}
        >
          <AboutHero />
          <AboutOverview />
        </FixedContainer>
      </Box>
      <Box>
        <AboutCCDL />
      </Box>
    </>
  )
}

export default About
