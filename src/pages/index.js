import { Box, Heading } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchBox } from 'components/shared/SearchBox'
import { Hero } from 'components/Hero'

const HeroContent = () => {
  return (
    <>
      <Heading level={1} size="large">
        Search for normalized transcriptome data
      </Heading>
      <SearchBox large primary />
    </>
  )
}

const Home = () => {
  return (
    <FixedContainer>
      <Box>
        <Hero body={<HeroContent />} />
      </Box>
    </FixedContainer>
  )
}

export default Home
