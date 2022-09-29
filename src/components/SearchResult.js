import { Box } from 'grommet'
import { SearchResultExperimentHeader } from 'components/SearchResultExperimentHeader'
import { SearchResultHeader } from 'components/SearchResultHeader'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  + div {
    margin-top: 24px;
  }
`

export const SearchResult = () => {
  return (
    <Wrapper elevation="medium" pad="medium">
      <SearchResultHeader />
      <SearchResultExperimentHeader />
    </Wrapper>
  )
}

export default SearchResult
