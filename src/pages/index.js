import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { SignUpBlock } from 'components/shared/SignUpBlock'
import { Documents, Examples, Features, Hero } from 'components/Home'

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
        <Hero />
        <Features />
      </Box>
      <Examples />
      <Documents />
      <SignUpBlock />
    </>
  )
}

export default Home
