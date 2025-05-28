import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatURLString from 'helpers/formatURLString'
import gtag from 'analytics/gtag'
import { Anchor } from 'components/Anchor'
import { IconBadge } from 'components/IconBadge'
import { TextHighlight } from 'components/TextHighlight'

export const ExperimentCardHeader = ({ experiment, isLinked = false }) => {
  const { accession_code: accessionCode, title } = experiment
  const { setResponsive } = useResponsive()

  const handleClick = () => {
    gtag.trackExperimentPageClick(ExperimentCardHeader)
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
            href={{
              pathname: `experiments/${accessionCode}/${formatURLString(
                title
              )}`,
              query: { ref: 'search' }
            }}
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

ExperimentCardHeader.displayName = 'ExperimentCardHeader'

export default ExperimentCardHeader
