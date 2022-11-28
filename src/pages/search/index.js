import { Box, Grid } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchCard } from 'components/SearchCard'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchFilterList } from 'components/SearchFilterList'
import data from 'api/data'

export const Search = () => {
  return (
    <>
      <FixedContainer pad="large">
        <Grid
          areas={[
            { name: 'top', start: [1, 0], end: [1, 0] },
            { name: 'side', start: [0, 1], end: [0, 1] },
            { name: 'main', start: [1, 1], end: [1, 1] }
          ]}
          columns={['250px', 'auto']}
          rows={['auto', 'auto']}
          gap={{
            row: '0',
            column: 'xxlarge'
          }}
        >
          <Box
            gridArea="top"
            margin={{ top: '40px', bottom: 'xlarge' }}
            style={{ display: 'block' }}
            width="550px"
          >
            <SearchBox
              placeholder={data.SearchInput.token.placeholder}
              btnType="secondary"
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
      </FixedContainer>
      <BackToTopButton />
    </>
  )
}

export default Search
