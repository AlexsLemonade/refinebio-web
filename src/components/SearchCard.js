import { Box } from 'grommet'
import { SearchCardHeader } from 'components/SearchCardHeader'
import { SearchCardBody } from 'components/SearchCardBody'
import { SearchCardFooter } from 'components/SearchCardFooter'
import { SearchCardMeta } from 'components/SearchCardMeta'
import styled from 'styled-components'

const Wrapper = styled(Box)`
  + div {
    margin-top: 24px;
  }
`

/* TEMPORARY the following prop is added for demo purpose
prop: status 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supported
   - request
   - unavailable
   - qn_skipped
*/

export const SearchCard = ({ status = '' }) => {
  return (
    <Wrapper elevation="medium" pad="medium">
      <SearchCardHeader status={status} />
      <SearchCardMeta />
      <SearchCardBody />
      <SearchCardFooter />
    </Wrapper>
  )
}

export default SearchCard
