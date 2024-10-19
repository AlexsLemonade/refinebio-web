import { Box, Heading, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import { Button } from 'components/shared/Button'
import { Pill } from 'components/shared/Pill'
import { Row } from 'components/shared/Row'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { ViewSamplesButton } from '../ViewSamplesButton'

export const ViewBlock = ({
  dataset,
  specieName,
  samplesInSpecie,
  sampleMetadataFields,
  specieDatasetSlice,
  hasRnaSeqExperiments,
  isImmutable
}) => {
  const { loading, removeSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const totalSamples = formatNumbers(samplesInSpecie.length)

  return (
    <Box animation={{ type: 'fadeIn', duration: 800 }}>
      <Heading level={2}>
        <TextCapitalized text={<>{formatString(specieName)} Samples</>} />
      </Heading>
      {hasRnaSeqExperiments && !dataset.quantile_normalize && (
        <Box margin={{ top: 'small' }}>
          <Pill
            label="Quantile Normalization will be skipped for RNA-seq samples"
            status="info"
          />
        </Box>
      )}
      <Row margin={{ top: 'small' }}>
        <Box>
          <Text margin={{ bottom: 'small' }}>
            {totalSamples} {samplesInSpecie.length > 1 ? 'Samples' : 'Sample'}
          </Text>
          <ViewSamplesButton
            dataset={specieDatasetSlice}
            params={{
              dataset_id: dataset.id,
              organism__name: specieName
            }}
            sampleMetadataFields={sampleMetadataFields}
            isImmutable={isImmutable}
          />
        </Box>
        {!isImmutable && (
          <Button
            isLoading={loading}
            label="Remove"
            margin={{ top: setResponsive('small', 'none') }}
            responsive
            tertiary
            onClick={() => removeSamples(specieDatasetSlice, true)}
          />
        )}
      </Row>
    </Box>
  )
}

export default ViewBlock
