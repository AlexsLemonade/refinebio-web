import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Link } from 'components/shared/Link'

export const SearchCardHeader = ({ accessionCode = '', title = '' }) => {
  const { setResponsive } = useResponsive()

  return (
    <Box width="100%">
      <IconBadge
        name="Accession"
        label={accessionCode}
        pad={{ bottom: 'small' }}
        size="medium"
      />
      <Heading
        level={3}
        weight="600"
        style={{ lineHeight: setResponsive('1', '1.5') }}
      >
        <Link href="#url" label={title} />
      </Heading>
    </Box>
  )
}

export default SearchCardHeader
