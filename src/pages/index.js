import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { HomeDocuments } from 'pages/home/HomeDcouments'
import { HomeExamples } from 'pages/home/HomeExamples'
import { HomeFeatures } from 'pages/home/HomeFeatures'
import { HomeHero } from 'pages/home/HomeHero'
import { HomeSignUp } from 'pages/home/HomeSignUp'

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
