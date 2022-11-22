import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { HomeDocumentsSection } from 'components/Home/HomeDocumentsSection'
import { HomeExamplesSection } from 'components/Home/HomeExamplesSection'
import { HomeFeaturesSection } from 'components/Home/HomeFeaturesSection'
import { HomeHero } from 'components/Home/HomeHero'
import { HomeSignUpSection } from 'components/Home/HomeSignUpSection'

const Home = () => {
  const { setResponsive } = useResponsive()

  return (
    <>
      <Box
        pad={{
          top: setResponsive('basex7', 'basex7', 'basex10'),
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
