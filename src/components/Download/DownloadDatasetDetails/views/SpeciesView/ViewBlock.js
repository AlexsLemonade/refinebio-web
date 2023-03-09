import { useEffect, useState, useRef } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { formatString } from 'helpers/formatString'
import { Box, Heading, Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Pill } from 'components/shared/Pill'
import { Row } from 'components/shared/Row'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { links } from 'config'
import { ViewSamplesButton } from '../ViewSamplesButton'

export const ViewBlock = ({
  specieName,
  samplesInSpecie,
  hasRnaSeqExperiments,
  quantileNormalize,
  sampleMetadataFields,
  specieDatasetSlice,
  isImmutable
}) => {
  const { removeSamples } = useDataset()
  const { setResponsive } = useResponsive()

  /* === TEMPORARY for Demo : START === */
  // This will be replaced and handled with API calls
  const timer = useRef(null)
  const [loading, setLoading] = useState(false)
  const stopTimer = () => clearTimeout(timer.current)
  const handleRemoveSamples = (datasetSlice) => {
    if (timer.current) stopTimer()
    setLoading(true)
    timer.current = window.setTimeout(() => {
      removeSamples(datasetSlice)
      setLoading(false)
    }, 1500)
  }
  useEffect(() => {
    return () => stopTimer()
  }, [])
  /* === TEMPORARY for Demo : END === */

  return (
    <Box animation={{ type: 'fadeIn', duration: 800 }}>
      <Heading level={2}>
        <TextCapitalized text={<>{formatString(specieName)} Samples</>} />
      </Heading>
      {hasRnaSeqExperiments && !quantileNormalize && (
        <Box margin={{ top: 'small' }}>
          <Pill
            label={
              <Anchor
                href={
                  links.refinebio_docs_quantile_normalization_rna_seq_samples
                }
                label="Quantile Normalization will be skipped for RNA-seq samples"
                linkColor="black"
                underlineOnHover={false}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            status="info"
          />
        </Box>
      )}
      <Row margin={{ top: 'small' }}>
        <Box>
          <Text margin={{ bottom: 'small' }}>
            {formatNumbers(samplesInSpecie.length)}{' '}
            {samplesInSpecie.length > 1 ? 'Samples' : 'Sample'}
          </Text>
          <ViewSamplesButton
            id={specieName}
            sampleMetadataFields={sampleMetadataFields}
          />
        </Box>
        {!isImmutable && (
          <Button
            isLoading={loading}
            label="Remove"
            margin={{ top: setResponsive('small', 'none') }}
            responsive
            tertiary
            onClick={() => handleRemoveSamples(specieDatasetSlice)}
          />
        )}
      </Row>
    </Box>
  )
}

export default ViewBlock
