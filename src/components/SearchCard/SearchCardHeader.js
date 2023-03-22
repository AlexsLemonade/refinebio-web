import { useResponsive } from 'hooks/useResponsive'
import { formatURLString } from 'helpers/formatURLString'
import { Box, Heading } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Anchor } from 'components/shared/Anchor'

export const SearchCardHeader = ({
  accessionCode = '',
  title = '',
  isLinked = true
}) => {
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
        weight={isLinked ? '600' : '400'}
        style={{ lineHeight: setResponsive('1', '1.5') }}
      >
        {isLinked ? (
          <Anchor
            href={`experiments/${accessionCode}/${formatURLString(title)}`}
            label={title}
          />
        ) : (
          title
        )}
      </Heading>
    </Box>
  )
}

export default SearchCardHeader
