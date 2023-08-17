import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { CCDL, Overview, Hero } from 'components/About'

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
        <Hero />
      </FixedContainer>

      <FixedContainer
        pad={{ horizontal: setResponsive('medium', 'medium', 'basex15') }}
      >
        <Overview />
      </FixedContainer>
      <FixedContainer
        pad={{ horizontal: setResponsive('medium', 'medium', 'basex15') }}
      >
        <CCDL />
      </FixedContainer>
    </Box>
  )
}

export default About
