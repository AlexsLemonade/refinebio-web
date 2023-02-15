import { useEffect, useState, useRef } from 'react'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { formatNumbers } from 'helpers/formatNumbers'
import { formatString } from 'helpers/formatString'
import { unionizeArrays } from 'helpers/unionizeArrays'
import { Box, Heading, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { ViewSamplesButton } from './ViewSamplesButton'

const ViewBlock = ({
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
    // console.log(typeof loading)
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

export const SpeciesView = ({
  dataset: {
    data: datasetData,
    experiments,
    organism_samples: samplesBySpecies,
    quantile_normalize: quantileNormalize
  },
  isImmutable = false
}) => {
  return (
    <Box elevation="medium" pad="medium">
      {Object.keys(samplesBySpecies).map((specieName, i) => {
        // get the accession codes accosiated with the specieName
        const samplesInSpecie = samplesBySpecies[specieName]
        // filter the dataset to only include the experiments containing the samplesInSpecie
        const specieDatasetSlice = Object.entries(datasetData).reduce(
          (accumulator, [key, value]) => {
            accumulator[key] = value.filter((accessionCode) =>
              samplesInSpecie.includes(accessionCode)
            )
            return accumulator
          },
          {}
        )
        // merge all the sample metadata fields of all experiments containing the specieDatasetSlice
        // in order to display all possible values of these samples
        const sampleMetadataFields = unionizeArrays(
          ...Object.keys(specieDatasetSlice)
            .filter(
              (accessionCode) => specieDatasetSlice[accessionCode].length > 0
            )
            .map((accessionCode) => {
              return (
                experiments[accessionCode] &&
                experiments[accessionCode].sample_metadata
              )
            })
        )
        // NOTE: if some of the experiments have samples of the same organism and it's also rna seq,
        // then we can deduce there're rna seq samples for this organism
        const hasRnaSeqExperiments = Object.values(experiments).some(
          (experiment) =>
            experiment.technology === 'RNA-SEQ' &&
            experiment.organism_names.includes(specieName)
        )

        return (
          <ViewBlock
            key={specieName}
            hasRnaSeqExperiments={hasRnaSeqExperiments}
            i={i}
            isImmutable={isImmutable}
            sampleMetadataFields={sampleMetadataFields}
            samplesInSpecie={samplesInSpecie}
            specieDatasetSlice={specieDatasetSlice}
            specieName={specieName}
            quantileNormalize={quantileNormalize}
          />
        )
      })}
    </Box>
  )
}

export default SpeciesView
