import { Box } from 'grommet'
import { SearchBulkActions } from 'components/SearchBulkActions'
import { SearchCard } from 'components/SearchCard'
import { SearchInput } from 'components/SearchInput'
// import { SearchFilters } from 'components/SearchFilters'

export const Search = () => {
  return (
    // TEMPORARY <Box> Wrapper
    <Box pad="medium">
      <SearchInput placeholder="Enter keyword" large />
      <SearchBulkActions />
      <SearchCard />
      {/* <SearchFilters /> */}
    </Box>
  )
}

export default Search
