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

  // maps the sample accession codes (by organism) to the corresponding experiment accession code
  // (as the dataset.data structure) to support adding/removing samples via API
  // e.g., { experimentAccession: [ sampleAccessions ]}
  const organismDatasetData = organismExperiments.reduce(
    (acc, { accession_code: ac }) => {
      if (dataset.data[ac]) {
        acc[ac] = dataset.data[ac]
      }
      return acc
    },
    {}
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
              onClick={() => removeSamples(organismDatasetData, true)}
            />
          )}
        </Row>
      </Box>
    </SamplesContextProvider>
  )
}

export default ViewBlock
