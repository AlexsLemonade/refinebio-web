import { Box, Heading, Text } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { SearchBox } from 'components/shared/SearchBox'

export const HomeHero = () => {
  const { setResponsive } = useResponsive()
  const { navigateToSearch } = useSearchManager()
  const exampleSearches = ['Notch', 'medulloblastoma', 'GSE24528']

  const handleSubmit = (val) => {
    navigateToSearch((val && { search: val }) || '')
  }

  return (
    <FixedContainer>
      <Hero
        boxPadding={{
          horizontal: setResponsive('large', 'basex12'),
          vertical: setResponsive('large', 'basex8')
        }}
        // fixed width to preserve UI layout in wider screens
        boxWidth="815px"
      >
        <Heading
          level={1}
          margin={{ bottom: setResponsive('medium', 'medium', 'xlarge') }}
          size="large"
          textAlign="center"
        >
          Search for normalized transcriptome data
        </Heading>
        <SearchBox
          placeholder={setResponsive(
            'Search accessions, pathways, etc.,',
            'Search accessions, pathways, diseases, etc.,'
          )}
          size="large"
          primary
          responsive
          onSubmit={handleSubmit}
        />
        <Box
          align={setResponsive('center', 'start')}
          direction={setResponsive('column', 'row')}
          justify="between"
          margin={{ top: setResponsive('large', 'large', 'xlarge') }}
          width="100%"
        >
          <Text size="xlarge">Try searching for:</Text>
          {exampleSearches.map((es) => (
            <Button
              key={es}
              label={<Text size="xlarge">{es}</Text>}
              link
              margin={{ top: setResponsive('small') }}
              onClick={() => navigateToSearch({ search: es })}
            />
          ))}
        </Box>
      </Hero>
    </FixedContainer>
  )
}

export default HomeHero
