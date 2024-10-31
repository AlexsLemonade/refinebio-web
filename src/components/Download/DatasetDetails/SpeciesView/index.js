import unionizeArrays from 'helpers/unionizeArrays'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const SpeciesView = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples, experiments } = dataset
  // format experiments into an object with accession codes as ksey
  const formattedExperiments = Object.fromEntries(
    experiments.map((experiment) => [experiment.accession_code, experiment])
  )

  return (
    <ViewBlocks elevation="medium" pad="medium">
      {Object.keys(organismSamples).map((organismName) => {
        // get the accession codes accosiated with the organismName
        const samplesInOrganism = organismSamples[organismName]
        // filter the dataset to only include the experiments containing the samplesInOrganism
        const organismDataSlice = Object.entries(dataset.data).reduce(
          (accumulator, [key, value]) => {
            accumulator[key] = value.filter((accessionCode) =>
              samplesInOrganism.includes(accessionCode)
            )
            return accumulator
          },
          {}
        )
        // merge all the sample metadata fields of all experiments containing the organismDataSlice
        // in order to display all possible values of these samples
        const sampleMetadataFields = unionizeArrays(
          ...Object.keys(organismDataSlice)
            .filter(
              (accessionCode) => organismDataSlice[accessionCode].length > 0
            )
            .map((accessionCode) => {
              return (
                formattedExperiments[accessionCode] &&
                formattedExperiments[accessionCode].sample_metadata
              )
            })
        )
        // if some of the experiments have samples of the same organism and it's also rna seq,
        // then we can deduce there're rna seq samples for this organism
        const hasRnaSeqExperiments = Object.values(formattedExperiments).some(
          ({ technology, organism_names: name }) =>
            technology === 'RNA-SEQ' && technology.includes(name)
        )

        return (
          <ViewBlock
            key={organismName}
            dataset={dataset}
            sampleMetadataFields={sampleMetadataFields}
            samplesInOrganism={samplesInOrganism}
            organismDataSlice={organismDataSlice}
            organismName={organismName}
            hasRnaSeqExperiments={hasRnaSeqExperiments}
            isImmutable={isImmutable}
          />
        )
      })}
    </ViewBlocks>
  )
}

export default SpeciesView
