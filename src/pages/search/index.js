import { Box, Grid } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchCard } from 'components/SearchCard'
import { SearchInput } from 'components/SearchInput'
import { SearchFilterList } from 'components/SearchFilterList'
import styled from 'styled-components'
import data from 'api/data'

// TEMPORARY Wrapper/Grid layout to render the search result page's components(agnostic) in UI
// TODO: Create a seprate issue for the site structure(desfine Layout, Header, Footer, Sidebar/responsive etc)
const Wrapper = styled(Box)`
  flex-direction: row;
  justify-content: center;
  > div {
    width: 1250px;
  }
`

export const Search = () => {
  return (
    <>
      <Wrapper pad="large">
        <Grid
          areas={[
            { name: 'top', start: [1, 0], end: [1, 0] },
            { name: 'side', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] }
          ]}
          columns={['250px', 'auto']}
          rows={['auto', 'auto']}
          gap={{
            row: 0,
            column: 'xxlarge'
          }}
        >
          <Box
            gridArea="top"
            style={{ display: 'block' }}
            margin={{ top: '40px', bottom: 'xlarge' }}
          >
            <SearchInput
              placeholder={data.SearchInput.token.placeholder}
              large
            />
          </Box>
          <Box gridArea="side" style={{ display: 'block' }}>
            <SearchFilterList />
          </Box>
          <Box gridArea="main">
            <SearchBulkActions />
            {data.SearchResults.results.map((result) => (
              <SearchCard key={result.id} result={result} />
            ))}
          </Box>
        </Grid>
      </Wrapper>
      <BackToTopButton />
    </>
  )
}

export default Search