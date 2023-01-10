import { useResponsive } from 'hooks/useResponsive'
import { formatString } from 'helpers/formatString'
import { formatPlatformName } from 'helpers/formatPlatformName'
import { Box } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'

export const SearchCardMeta = ({
  metaData: { downloadableSamples, organismNames, platformNames, technology }
}) => {
  const { setResponsive } = useResponsive()

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
      gap="small"
      pad={{ vertical: 'xsmall' }}
    >
      <Box flex="grow" width={setResponsive('100%', '100%', { max: '30%' })}>
        {organismNames.length > 0 ? (
          <IconBadge
            label={organismNames.map(
              (organismName, i) =>
                `${i > 0 ? ', ' : ''}${formatString(organismName)}`
            )}
            name="Organism"
          />
        ) : (
          <TextNull text="No species" />
        )}
      </Box>
      <Box flex="grow">
        <IconBadge
          label={`${downloadableSamples.toLocaleString()} Downloadable Samples`}
          name="Samples"
        />
      </Box>
      <Box flex="grow" width={setResponsive('100%', '100%', { max: '40%' })}>
        {platformNames.length > 0 ? (
          <IconBadge
            label={platformNames.map(
              (platformName, i) =>
                `${i > 0 ? ', ' : ''}${formatPlatformName(platformName)}`
            )}
            name={technology === 'MICROARRAY' ? 'MicroArray' : 'Rna'}
          />
        ) : (
          <TextNull text="No platform available" />
        )}
      </Box>
    </Row>
  )
}

export default SearchCardMeta
