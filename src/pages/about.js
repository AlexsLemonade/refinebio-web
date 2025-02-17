import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { AboutCCDL } from 'components/AboutCCDL'
import { AboutHero } from 'components/AboutHero'
import { AboutOverview } from 'components/AboutOverview'
import { FixedContainer } from 'components/FixedContainer'

const About = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        top: 'basex10',
        bottom: setResponsive('basex7', 'basex7', 'basex9')
      }}
    >
      <FixedContainer
        pad={{ horizontal: setResponsive('none', 'medium', 'basex15') }}
      >
        <AboutHero />
      </FixedContainer>

      <FixedContainer
        pad={{ horizontal: setResponsive('medium', 'medium', 'basex15') }}
      >
        <AboutOverview />
      </FixedContainer>
      <FixedContainer
        pad={{ horizontal: setResponsive('medium', 'medium', 'basex15') }}
      >
        <AboutCCDL />
      </FixedContainer>
    </Box>
  )
}

export default About
