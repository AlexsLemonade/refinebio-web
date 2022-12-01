import { Box, Heading } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Link } from 'components/shared/Link'

export const SearchCardHeader = ({ accessionCode = '', title = '' }) => {
  return (
    <Box width="100%">
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
  )
}

export default SearchCardHeader
