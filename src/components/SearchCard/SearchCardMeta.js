import { formatString } from 'helpers/formatString'
import { formatPlatformName } from 'helpers/formatPlatformName'
import { Box, Text } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'

export const SearchCardMeta = ({
  metaData: { downloadableSamples, organismNames, platformNames, technology }
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
      pad={{ vertical: 'xsmall' }}
    >
      <Box flex="grow">
        {organismNames.length > 0 ? (
          organismNames.map((organismName) => (
            <IconBadge
              key={organismName}
              label={formatString(organismName)}
              name="Organism"
            />
          ))
        ) : (
          <Text color="gray-shade-40">
            <i>No species</i>
          </Text>
        )}
      </Box>
      <Box flex="grow">
        <IconBadge
          label={`${downloadableSamples} Downloadable Samples`}
          name="Samples"
        />
      </Box>
      <Box width={{ max: '40%' }}>
        {platformNames.length > 0 ? (
          <IconBadge
            label={platformNames.map(
              (platformName, i) =>
                ` ${i > 0 ? ', ' : ''}${formatPlatformName(platformName)}`
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
