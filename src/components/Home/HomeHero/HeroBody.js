import { useState } from 'react'
import { useSearch } from 'hooks/useSearch'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { SearchBox } from 'components/shared/SearchBox'

export const HeroBody = () => {
  const { setResponsive } = useResponsive()
  const { setSearchTerm } = useSearch()
  const [userInput, setUserInput] = useState()
  const queries = ['Notch', 'medulloblastoma', 'GSE24528']
  const pathname = 'search'

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(userInput)
    router.push({
      pathname,
      query: userInput && {
        search: userInput
      }
    })
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
          <Text
            key={query}
            size="large"
            margin={{ top: setResponsive('small') }}
          >
            <Anchor
              label={query}
              href={{ pathname, query: { search: query } }}
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
