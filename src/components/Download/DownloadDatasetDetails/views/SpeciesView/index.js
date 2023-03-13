import { unionizeArrays } from 'helpers/unionizeArrays'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const SpeciesView = ({
  dataset: {
    data: datasetData,
    id: datasetId,
    experiments,
    organism_samples: samplesBySpecies,
    quantile_normalize: quantileNormalize
  },
  isImmutable
}) => {
  return (
    <ViewBlocks elevation="medium" pad="medium">
      {Object.keys(samplesBySpecies).map((specieName) => {
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
            datasetId={datasetId}
            hasRnaSeqExperiments={hasRnaSeqExperiments}
            sampleMetadataFields={sampleMetadataFields}
            samplesInSpecie={samplesInSpecie}
            specieDatasetSlice={specieDatasetSlice}
            specieName={specieName}
            quantileNormalize={quantileNormalize}
            isImmutable={isImmutable}
          />
        )
      })}
    </ViewBlocks>
  )
}

export default SpeciesView
