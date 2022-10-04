import { Box } from 'grommet'
import { SearchCardMeta } from 'components/SearchCardMeta'
import { SearchCardHeader } from 'components/SearchCardHeader'
import { SearchCardBody } from 'components/SearchCardBody'
import { SearchCardFooter } from 'components/SearchCardFooter'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  + div {
    margin-top: 24px;
  }
`

export const SearchCard = () => {
  return (
    <Wrapper elevation="medium" pad="medium">
      <SearchCardHeader />
      <SearchCardMeta />
      <SearchCardBody />
      <SearchCardFooter />
    </Wrapper>
  )
}

export default SearchCard
