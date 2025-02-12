import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { HomeDocuments } from 'components/HomeDocuments'
import { HomeExamples } from 'components/HomeExamples'
import { HomeFeatures } from 'components/HomeFeatures'
import { HomeHero } from 'components/HomeHero'
import { SignUpBlock } from 'components/shared/SignUpBlock'

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
        <HomeFeatures />
      </Box>
      <HomeExamples />
      <HomeDocuments />
      <SignUpBlock />
    </>
  )
}

export default Home
