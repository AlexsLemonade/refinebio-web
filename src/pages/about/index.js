import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  AboutCCDLSection,
  AboutOverviewSection,
  AboutHero
} from 'components/About'

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
        <AboutOverviewSection />
      </FixedContainer>
      <FixedContainer
        pad={{ horizontal: setResponsive('medium', 'medium', 'basex15') }}
      >
        <AboutCCDLSection />
      </FixedContainer>
    </Box>
  )
}

export default About
