import { useState } from 'react'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Hero } from 'components/shared/Hero'
import { SearchBox } from 'components/shared/SearchBox'

const HeroBody = () => {
  const { setResponsive } = useResponsive()
  const { navigateToSearch } = useSearchManager()
  const [userInput, setUserInput] = useState()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']

  const handleSubmit = (e) => {
    e.preventDefault()
    navigateToSearch(userInput && { search: userInput })
  }

  return (
    <>
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
        value={userInput}
        size="large"
        primary
        responsive
        clickHandler={() => setUserInput('')}
        changeHandler={(e) => setUserInput(e.target.value)}
        submitHandler={handleSubmit}
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
          <Button
            key={query}
            label={<Text size="xlarge">{query}</Text>}
            link
            margin={{ top: setResponsive('small') }}
            onClick={() => navigateToSearch({ search: query })}
          />
        ))}
      </Box>
    </>
  )
}

export const HomeHero = () => {
  const { setResponsive } = useResponsive()
  return (
    <FixedContainer>
      <Hero
        body={<HeroBody />}
        boxPadding={{
          horizontal: setResponsive('large', 'basex12'),
          vertical: setResponsive('large', 'basex8')
        }}
        // fixed width to preserve UI layout in wider screens
        boxWidth="815px"
      />
    </FixedContainer>
  )
}

export default HomeHero
