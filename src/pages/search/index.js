import { Box, Grid } from 'grommet'
import { BackToTopButton } from 'components/shared/BackToTopButton'
import { FixedContainer } from 'components/shared/FixedContainer'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchCard } from 'components/SearchCard'
import { SearchBox } from 'components/shared/SearchBox'
import { SearchFilterList } from 'components/SearchFilterList'
import data from 'api/mockData'

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
            column: 'basex12'
          }}
        >
          <Box
            gridArea="top"
            margin={{ top: '40px', bottom: 'xlarge' }}
            style={{ display: 'block' }}
            width="550px"
          >
            <SearchBox
              placeholder="Search accessions, pathways, diseases, etc.,"
              btnType="secondary"
            />
          </Box>
          <Box gridArea="side" style={{ display: 'block' }}>
            <SearchFilterList facets={data.facets} />
          </Box>
          <Box gridArea="main">
            <SearchBulkActions results={data} />
            {data.results.map((result) => (
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
