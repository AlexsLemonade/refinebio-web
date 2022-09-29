import { Box } from 'grommet'
import { SearchResult } from 'components/SearchResult'

export const Search = () => {
  return (
    // TEMPORARY <Box> Wrapper
    <Box pad="medium">
      <SearchResult />
      <SearchResult />
    </Box>
  )
}

export default Search
