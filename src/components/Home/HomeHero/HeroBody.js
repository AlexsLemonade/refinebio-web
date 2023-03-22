import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { SearchBox } from 'components/shared/SearchBox'

export const HeroBody = () => {
  const { setResponsive } = useResponsive()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  return (
    <>
      <Heading
        level={1}
        margin={{ bottom: setResponsive('medium', 'medium', 'xlarge') }}
        size={setResponsive('h1Small', 'h1Large')}
        textAlign="center"
      >
        Search for normalized transcriptome data
      </Heading>
      <SearchBox
        size="large"
        placeHolder={setResponsive(
          'Search accessions, pathways, etc.,',
          'Search accessions, pathways, diseases, etc.,'
        )}
        primary
        responsive
      />
      <Box
        align={setResponsive('center', 'start')}
        direction={setResponsive('column', 'row')}
        justify="between"
        margin={{ top: setResponsive('large', 'large', 'xlarge') }}
        width="100%"
      >
        <Text size="xlarge">Try searching for:</Text>

        {queries.map((query) => (
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Anchor
              label={query}
              href={{ pathname: '/search', query: { query } }}
              size="xlarge"
              underline
            />
          </Text>
        ))}
      </Box>
    </>
  )
}

export default HeroBody
