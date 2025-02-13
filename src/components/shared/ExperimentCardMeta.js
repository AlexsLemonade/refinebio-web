/* eslint-disable no-nested-ternary */
import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import isArray from 'helpers/isArray'
import formatPlatformName from 'helpers/formatPlatformName'
import getPlatformNamesFromExperiment from 'helpers/getPlatformNamesFromExperiment'
import getTechnologyFromExperiment from 'helpers/getTechnologyFromExperiment'
import { IconBadge } from 'components/shared/IconBadge'
import { Row } from 'components/shared/Row'
import { TextHighlight } from 'components/shared/TextHighlight'
import { TextNull } from 'components/shared/TextNull'

export const ExperimentCardMeta = ({ experiment, size = 'small' }) => {
  const { setResponsive } = useResponsive()
  const {
    num_downloadable_samples: downloadableSamples,
    organism_names: organismNames
  } = experiment
  // gets the platform names from the samples array if it exists
  const platformNames = getPlatformNamesFromExperiment(experiment)
  // gets the technology from the samples array if it exists
  const technology = getTechnologyFromExperiment(experiment)
  const technologyName = isArray(technology) ? technology.join('') : technology

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
        <IconBadge
          label={`${
            downloadableSamples > 0 ? formatNumbers(downloadableSamples) : 'No'
          } Downloadable Samples`}
          name="Samples"
          size={size}
        />
      </Box>
      <Box flex="grow" width={setResponsive('100%', '100%', { max: '40%' })}>
        {platformNames.length > 0 ? (
          <IconBadge
            label={
              <TextHighlight>
                {isArray(platformNames)
                  ? platformNames.map(formatPlatformName).join(', ')
                  : platformNames}
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

export default ExperimentCardMeta
