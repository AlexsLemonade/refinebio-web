import { useResponsive } from 'hooks/useResponsive'
import Link from 'next/link'
import { Box, Heading, Text } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchBox } from 'components/shared/SearchBox'
import { Hero } from 'components/shared/Hero'

const HeroContent = () => {
  const { setResponsive } = useResponsive()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  return (
    <>
      <Heading
        level={1}
        margin={{ bottom: setResponsive('large', 'medium') }}
        size="large"
        textAlign={setResponsive('center', 'start')}
      >
        Search for normalized transcriptome data
      </Heading>
      <SearchBox
        btnWidth={setResponsive('100%', '120px')}
        size="xlarge"
        placeHolder={setResponsive(
          'Search accessions, pathways, etc.,',
          'Search accessions, pathways, diseases, etc.,'
        )}
        primary
      />
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        margin={{ top: setResponsive('32px', 'medium') }}
        width="100%"
      >
        <Text size="large">Try searching for:</Text>
        {queries.map((query) => (
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Link href={{ pathname: '/search', query: { query } }} size="large">
              {query}
            </Link>
          </Text>
        ))}
      </Box>
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
