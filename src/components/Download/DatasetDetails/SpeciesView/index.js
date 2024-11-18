import intersectArrays from 'helpers/intersectArrays'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const SpeciesView = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples, experiments } = dataset
  const organismsNames = Object.keys(organismSamples)

  // filter dataset.data to include experiments with common samples
  const getFilteredDataSlice = (samples) => {
    return Object.entries(dataset.data).filter(
      ([, experimentSamples]) =>
        intersectArrays(samples, experimentSamples).length > 0
    )
  }

  // merge all the sample metadata fields from experiments in the organism data slice
  // to display all possible values of these samples in the samples table
  const getSamplesMetadata = (samples) => {
    const filteredDataSlice = getFilteredDataSlice(samples)

    return filteredDataSlice
      .map(
        ([accession]) =>
          dataset.experiments.find((e) => e.accession_code === accession)
            ?.sample_metadata || []
      )
      .flat()
  }

  // map the organism samples to their corresponding metadata
  const organismMetadata = Object.fromEntries(
    organismsNames.map((organismName) => {
      const samplesInOrganism = organismSamples[organismName]
      return [organismName, getSamplesMetadata(samplesInOrganism)]
    })
  )

  // chcek if RNA-Seq experiments exist for a give organism
  const hasRnaSeq = (organismName) =>
    experiments.some(
      ({ technology, organism_names: name }) =>
        technology === 'RNA-SEQ' && name.includes(organismName)
    )

  return (
    <ViewBlocks elevation="medium" pad="medium">
      {organismsNames.map((organismName) => {
        return (
          <ViewBlock
            key={organismName}
            dataset={dataset}
            samplesInOrganism={organismSamples[organismName]}
            sampleMetadataFields={organismMetadata[organismName]}
            organismName={organismName}
            hasRnaSeqExperiments={hasRnaSeq(organismName)}
            isImmutable={isImmutable}
          />
        )
      })}
    </ViewBlocks>
  )
}

export default SpeciesView
