import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import formatURLString from 'helpers/formatURLString'
import gtag from 'analytics/gtag'
import { IconBadge } from 'components/shared/IconBadge'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlight } from 'components/shared/TextHighlight'

export const SearchCardHeader = ({ experiment, isLinked = false }) => {
  const { accession_code: accessionCode, title } = experiment
  const { setSearchParams } = useSearchManager()
  const { setResponsive } = useResponsive()

  const handleClick = () => {
    setSearchParams((prev) => ({ ...prev, ref: 'search' }))
    gtag.trackExperimentPageClick(SearchCardHeader)
  }

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
            href={`experiments/${accessionCode}/${formatURLString(title)}`}
            label={<TextHighlight>{title}</TextHighlight>}
            onClick={handleClick}
          />
        ) : (
          <TextHighlight>{title}</TextHighlight>
        )}
      </Heading>
    </Box>
  )
}

export default SearchCardHeader
