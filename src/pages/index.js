import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { HomeDocuments } from 'components/home/HomeDcouments'
import { HomeExamples } from 'components/home/HomeExamples'
import { HomeFeatures } from 'components/home/HomeFeatures'
import { HomeHero } from 'components/home/HomeHero'
import { HomeSignUp } from 'components/home/HomeSignUp'

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
        <HomeFeatures />
      </Box>
      <HomeExamples />
      <HomeDocuments />
      <HomeSignUp />
    </>
  )
}

export default Home
