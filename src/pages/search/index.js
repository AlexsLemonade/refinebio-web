import { Box } from 'grommet'
// import { SearchCard } from 'components/SearchCard'
import { SearchInput } from 'components/SearchInput'
import { SearchFilters } from 'components/SearchFilters'

export const Search = () => {
  return (
    // TEMPORARY <Box> Wrapper
    <Box pad="medium">
      <SearchInput placeholder="Enter keyword" large />
      {/* <SearchCard /> */}
      <SearchFilters />
    </Box>
  )
}

export default Search
