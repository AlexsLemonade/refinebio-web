import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import {
  HomeDocumentsSection,
  HomeExamplesSection,
  HomeFeaturesSection,
  HomeSignUpSection,
  HomeHero
} from 'components/Home'

const Home = () => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box
        pad={{
          top: setResponsive('xxxlarge', 'xxxlarge', 'basex10'),
          bottom: setResponsive('xlarge', 'xlarge', 'basex12')
        }}
      >
        <HomeHero />
        <HomeFeaturesSection />
      </Box>
      <HomeExamplesSection />
      <HomeDocumentsSection />
      <HomeSignUpSection />
    </>
  )
}

export default Home
