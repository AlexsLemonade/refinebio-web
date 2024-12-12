import { Box, Heading, Text } from 'grommet'
import { SamplesContextProvider } from 'contexts/SamplesContext'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import { Button } from 'components/shared/Button'
import { Pill } from 'components/shared/Pill'
import { Row } from 'components/shared/Row'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { ViewSamplesButton } from '../ViewSamplesButton'

export const ViewBlock = ({ dataset, organismName, isImmutable }) => {
  const { loading, removeSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const samplesCount = dataset.organism_samples[organismName].length
  const totalSamples = formatNumbers(samplesCount)
  const { experiments } = dataset

  const organismExperiments = experiments.filter((e) =>
    e.organism_names.includes(organismName)
  )

  // chcek if any RNA-Seq experiments available for this organism
  const hasRnaSeq = organismExperiments.some(
    ({ technology }) => technology === 'RNA-SEQ'
  )

  // samples accession code by organism names
  const organismSamples = organismExperiments.map(
    (e) => dataset.data[e.accession_code]
  )

  return (
    <SamplesContextProvider
      query={{
        dataset_id: dataset.id,
        organism__name: organismName
      }}
    >
      <Box animation={{ type: 'fadeIn', duration: 800 }}>
        <Heading level={2}>
          <TextCapitalized text={<>{formatString(organismName)} Samples</>} />
        </Heading>
        {hasRnaSeq && !dataset.quantile_normalize && (
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
              {totalSamples} {samplesCount > 1 ? 'Samples' : 'Sample'}
            </Text>
            <ViewSamplesButton
              dataset={dataset}
              modalTitle={organismName}
              isImmutable={isImmutable}
              isSpeciesView
            />
          </Box>
          {!isImmutable && (
            <Button
              isLoading={loading}
              label="Remove"
              margin={{ top: setResponsive('small', 'none') }}
              responsive
              tertiary
              onClick={() => removeSamples(organismSamples, true)}
            />
          )}
        </Row>
      </Box>
    </SamplesContextProvider>
  )
}

export default ViewBlock
