import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import formatURLString from 'helpers/formatURLString'
import { IconBadge } from 'components/shared/IconBadge'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlight } from 'components/shared/TextHighlight'

export const SearchCardHeader = ({
  accessionCode = '',
  isLinked = true,
  title = ''
}) => {
  const { search, setSearch } = useSearchManager()
  const { setResponsive } = useResponsive()

  return (
    <Box width="100%">
      <IconBadge
        name="Accession"
        label={<TextHighlight>{accessionCode}</TextHighlight>}
        pad={{ bottom: 'small' }}
        size="medium"
      />
      <Heading
        level={3}
        weight={isLinked ? '600' : '400'}
        style={{
          wordBreak: 'break-word',
          lineHeight: setResponsive('1', '1.5')
        }}
      >
        {isLinked ? (
          <Anchor
            href={{
              pathname: `experiments/${accessionCode}/${formatURLString(title)}`
            }}
            label={<TextHighlight>{title}</TextHighlight>}
            onClick={() => setSearch({ ...search, ref: 'search' })}
          />
        ) : (
          <TextHighlight>{title}</TextHighlight>
        )}
      </Heading>
    </Box>
  )
}

export default SearchCardHeader
