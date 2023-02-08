import { formatString } from 'helpers/formatString'
import { formatPlatformName } from 'helpers/formatPlatformName'
import { Box, Text } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'

export const SearchCardMeta = ({
  metadata: { downloadableSamples, organismNames, platformNames, technology }
}) => {
  return (
    <Box
      align="center"
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
      direction="row"
      gap="small"
      pad={{ vertical: 'xsmall' }}
    >
      <Box flex="grow" width={{ max: '30%' }}>
        {organismNames.length > 0 ? (
          <IconBadge
            label={organismNames.map(
              (organismName, i) =>
                `${i > 0 ? ', ' : ''}${formatString(organismName)}`
            )}
            name="Organism"
          />
        ) : (
          <Text color="gray-shade-40">
            <i>No species</i>
          </Text>
        )}
      </Box>
      <Box flex="grow">
        <IconBadge
          label={`${downloadableSamples.toLocaleString()} Downloadable Samples`}
          name="Samples"
        />
      </Box>
      <Box flex="grow" width={{ max: '40%' }}>
        {platformNames.length > 0 ? (
          <IconBadge
            label={platformNames.map(
              (platformName, i) =>
                `${i > 0 ? ', ' : ''}${formatPlatformName(platformName)}`
            )}
            name={technology === 'MICROARRAY' ? 'MicroArray' : 'Rna'}
          />
        ) : (
          <Text color="gray-shade-40">
            <i>Not available</i>
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default SearchCardMeta
