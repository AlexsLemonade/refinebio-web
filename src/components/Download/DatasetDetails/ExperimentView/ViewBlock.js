import { Box, Heading, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import formatURLString from 'helpers/formatURLString'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { IconBadge } from 'components/shared/IconBadge'
import { Pill } from 'components/shared/Pill'
import { Row } from 'components/shared/Row'
import { TextNull } from 'components/shared/TextNull'
import { ViewSamplesButton } from '../ViewSamplesButton'

export const ViewBlock = ({
  datasetId,
  addedSamples,
  experiment,
  defaultOrganismFilterOption,
  experimentAccessionCode,
  metadataFields,
  quantileNormalize,
  isImmutable,
  setOrganism
}) => {
  const { loading, removeExperiment } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const handleRemoveExperiment = (datasetSlice) => {
    removeExperiment(datasetSlice, true)
    setOrganism(defaultOrganismFilterOption.value)
  }

  return (
    <Box animation={{ type: 'fadeIn', duration: 800 }}>
      {/* max value to preserve UI layout for wider screens */}
      <Box margin={{ bottom: 'xsmall' }} width={{ max: '640px' }}>
        <Heading level={5} responsive={false} weight="700">
          <Anchor
            href={`experiments/${experimentAccessionCode}/${formatURLString(
              experiment.title
            )}`}
            label={experiment.title}
          />
        </Heading>
        {experiment.technology === 'RNA-SEQ' && !quantileNormalize && (
          <Box margin={{ vertical: 'xsmall' }}>
            <Pill
              label="Quantile Normalization will be skipped"
              status="info"
            />
          </Box>
        )}
      </Box>
      <Row>
        <Box>
          <Box
            direction={setResponsive('column', 'column', 'row')}
            gap={setResponsive('small', 'small', 'xlarge')}
            margin={{ top: setResponsive('xsmall', 'none') }}
          >
            <IconBadge
              name="Accession"
              label={experiment.accession_code}
              size="medium"
            />
            <IconBadge
              label={`${formatNumbers(addedSamples.length)} Downloadable ${
                addedSamples.length > 1 ? 'Samples' : 'Sample'
              }`}
              name="Samples"
              size="medium"
            />
            <IconBadge
              label={experiment.organism_names
                .map((o) => formatString(o))
                .join(', ')}
              name="Organism"
              size="medium"
            />
          </Box>
          <Box margin={{ top: 'large', bottom: 'medium' }}>
            <Heading level={5} responsive={false} weight="500">
              Sample Metadata Fields
            </Heading>
            <Box direction="row" margin={{ top: 'xsmall' }}>
              {experiment.sample_metadata.length > 0 ? (
                <Text>{metadataFields.join(', ')}</Text>
              ) : (
                <TextNull text="No sample metadata fields" />
              )}
            </Box>
          </Box>
          {addedSamples.length > 0 && (
            <ViewSamplesButton
              dataset={{ [experimentAccessionCode]: addedSamples }}
              params={{
                dataset_id: datasetId,
                experiment_accession_code: experimentAccessionCode
              }}
              sampleMetadataFields={experiment.sample_metadata}
              isImmutable={isImmutable}
            />
          )}
        </Box>
        {!isImmutable && (
          <Button
            isLoading={loading}
            label="Remove"
            margin={{ top: setResponsive('small', 'none') }}
            responsive
            tertiary
            onClick={() => handleRemoveExperiment([experiment.accession_code])}
          />
        )}
      </Row>
    </Box>
  )
}

export default ViewBlock
