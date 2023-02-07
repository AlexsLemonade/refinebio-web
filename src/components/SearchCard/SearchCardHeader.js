import { Box, Heading } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Link } from 'components/shared/Link'
import { Row } from 'components/shared/Row'
import { SearchCardHeaderCTA } from './SearchCardHeaderCTA'

/* TEMPORARY the following prop is added for demo purpose
prop name: 'status' 
   - ''(default)
   - added
   - processing 
   - add_remaining
   - not_supporte
   - request
   - unavailable
*/

export const SearchCardHeader = ({
  accessionCode = '',
  status = '',
  title = ''
}) => {
  return (
    <Box pad={{ bottom: 'medium' }}>
      <Row>
        <Box fill>
          <IconBadge
            name="Accession"
            label={accessionCode}
            pad={{ bottom: 'small' }}
            size="medium"
          />
          <Heading level={3} weight="600">
            <Link href="#url" label={title} />
          </Heading>
        </Box>
        <Box
          alignSelf="stretch"
          justify="center"
          margin={{ left: 'large' }}
          width="300px"
        >
          <SearchCardHeaderCTA status={status} />
        </Box>
      </Row>
    </Box>
  )
}

export default SearchCardHeader
