import { useEffect, useRef, useState } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { formatString } from 'helpers/formatString'
import { formatURLString } from 'helpers/formatURLString'
import { Box, Heading, Text } from 'grommet'
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
  const { removeExperiment } = useDataset()
  const { setResponsive } = useResponsive()

  /* === TEMPORARY for Demo : START === */
  // This will be replaced and handled with API calls
  const timer = useRef(null)
  const [loading, setLoading] = useState(false)
  const stopTimer = () => clearTimeout(timer.current)
  const handleRemoveExperiment = (datasetSlice) => {
    if (timer.current) stopTimer()
    setLoading(true)
    timer.current = window.setTimeout(() => {
      removeExperiment(datasetSlice)
      setLoading(false)
      setOrganism(defaultOrganismFilterOption.value)
    }, 1500)
  }
  useEffect(() => {
    return () => stopTimer()
  }, [])
  /* === TEMPORARY for Demo : END === */

  return (
    <Box animation={{ type: 'fadeIn', duration: 800 }}>
      {/* max value to preserve UI layout for wider screens */}
      <Box margin={{ bottom: 'xsmall' }} width={{ max: '640px' }}>
        <Heading level={5} weight="700" size="h5Small">
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
              label={`${addedSamples.length} Downloadable ${
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
            <Heading level={5} weight="500" size="h5Small">
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
