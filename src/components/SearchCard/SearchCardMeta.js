/* eslint-disable no-nested-ternary */
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import isArray from 'helpers/isArray'
import formatPlatformName from 'helpers/formatPlatformName'
import { Box } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Row } from 'components/shared/Row'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const SearchCardMeta = ({
  downloadableSamples,
  organismNames,
  platformNames,
  technology,
  size = 'small'
}) => {
  const { setResponsive } = useResponsive()
  const technologyName = isArray(technology) ? technology.join('') : technology
  const downloadableSamplesText = `${
    downloadableSamples > 0 ? formatNumbers(downloadableSamples) : 'No'
  } Downloadable Sample${downloadableSamples > 1 ? 's' : ''}`

  return (
    <Row
      align={setResponsive('start', 'start', 'center')}
      border={[
        {
          color: 'gray-shade-40',
          side: 'top'
        },
        {
          color: 'gray-shade-40',
          side: 'bottom'
        }
      ]}
      direction={setResponsive('column', 'column', 'row')}
      justify="start"
      gap="small"
      pad={{ vertical: 'xsmall' }}
    >
      <Box flex="grow" width={setResponsive('100%', '100%', { max: '30%' })}>
        {organismNames.length > 0 ? (
          <IconBadge
            label={
              <TextHighlight>
                {organismNames.map(formatString).join(', ')}
              </TextHighlight>
            }
            name="Organism"
            size={size}
          />
        ) : (
          <TextNull text="No species" />
        )}
      </Box>
      <Box flex="grow">
        <IconBadge label={downloadableSamplesText} name="Samples" size={size} />
      </Box>
      <Box flex="grow" width={setResponsive('100%', '100%', { max: '40%' })}>
        {platformNames.length > 0 ? (
          <IconBadge
            label={
              <TextHighlight>
                {platformNames.map(formatPlatformName).join(', ')}
              </TextHighlight>
            }
            name={
              technologyName === 'MICROARRAY'
                ? 'MicroArray'
                : technologyName === 'RNA-SEQ'
                ? 'RnaSeq'
                : 'MixedPlatform'
            }
            size={size}
          />
        ) : (
          <TextNull text="No platform available" />
        )}
      </Box>
    </Row>
  )
}

export default SearchCardMeta
