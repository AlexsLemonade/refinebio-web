import { useEffect, useState, useRef } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { formatString } from 'helpers/formatString'
import { Box, Heading, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { ViewSamplesButton } from '../ViewSamplesButton'

export const ViewBlock = ({
  specieName,
  samplesInSpecie,
  hasRnaSeqExperiments,
  quantileNormalize,
  sampleMetadataFields,
  specieDatasetSlice,
  isImmutable,
  i
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
    <Box
      key={specieName}
      border={i ? { side: 'top' } : false}
      margin={{ top: i ? 'small' : 'none' }}
      pad={{ top: i ? 'small' : 'none' }}
    >
      <Heading level={2}>
        <TextCapitalized text={<>{formatString(specieName)} Samples</>} />
      </Heading>
      {hasRnaSeqExperiments && !quantileNormalize && (
        <InlineMessage
          label="Quantile Normalization will be skipped for RNA-seq samples"
          margin={{ top: 'small' }}
        />
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
