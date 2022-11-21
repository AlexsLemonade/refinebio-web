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
          <AboutOverviewSection />
        </FixedContainer>
      </Box>
      <Box>
        <AboutCCDLSection />
      </Box>
    </>
  )
}

export default About
