import unionizeArrays from 'helpers/unionizeArrays'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const SpeciesView = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples, experiments } = dataset
  const organismsNames = Object.keys(organismSamples)
  // format experiments into an object with accession codes as ksey
  const formattedExperiments = Object.fromEntries(
    experiments.map((experiment) => [experiment.accession_code, experiment])
  )

  // filter the dataset.data to only include the experiments containing given samples
  const getDataSlice = (samples) => {
    return Object.entries(dataset.data).reduce((accumulator, [key, value]) => {
      const filteredSamples = value.filter((accessionCode) =>
        samples.includes(accessionCode)
      )
      if (filteredSamples.length) {
        accumulator[key] = filteredSamples
      }
      return accumulator
    }, {})
  }

  // merge all the sample metadata fields from experiments in the organism data slice
  // to display all possible values of these samples in the samples table
  const getSampleMetadata = (dataSlice) => {
    return unionizeArrays(
      ...Object.keys(dataSlice).map(
        (accessionCode) =>
          formattedExperiments[accessionCode]?.sample_metadata || []
      )
    )
  }
  // chceks if RNA-Seq experiments exist for a give organism
  const hasRnaSeq = (organismName) =>
    Object.values(formattedExperiments).some(
      ({ technology, organism_names: name }) =>
        technology === 'RNA-SEQ' && name.includes(organismName)
    )

  return (
    <ViewBlocks elevation="medium" pad="medium">
      {organismsNames.map((organismName) => {
        // get the accession codes associated with organismName
        const samplesInOrganism = organismSamples[organismName]
        const organismDataSlice = getDataSlice(samplesInOrganism)
        const sampleMetadataFields = getSampleMetadata(organismDataSlice)
        const hasRnaSeqExperiments = hasRnaSeq(organismName)

        return (
          <ViewBlock
            key={organismName}
            dataset={dataset}
            samplesInOrganism={samplesInOrganism}
            sampleMetadataFields={sampleMetadataFields}
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
