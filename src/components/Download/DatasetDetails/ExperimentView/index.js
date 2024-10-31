import { useState } from 'react'
import { Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { OrganismFilter } from './OrganismFilter'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const ExperimentView = ({ dataset, isImmutable }) => {
  const { formatSampleMetadata } = useDatasetManager()
  const defaultOrganismFilterOption = { label: 'All Speciess', value: 'ALL' }
  const defaultValue = 'ALL'
  const [organism, setOrganism] = useState(defaultOrganismFilterOption.value)

  if (!dataset.data || !Object.keys(dataset.data).length) {
    return <Paragraph>No samples added to download dataset.</Paragraph>
  }

  return (
    <>
      <OrganismFilter
        dataset={dataset}
        defaultOption={defaultOrganismFilterOption}
        organism={organism}
        setOrganism={setOrganism}
      />
      <ViewBlocks elevation="medium" pad="medium">
        {dataset.experiments
          .filter(
            (experiment) =>
              organism === defaultValue ||
              experiment.organism_names.includes(organism)
          )
          .map((experiment) => {
            const { accession_code: experimentAccessionCode } = experiment

            return (
              <ViewBlock
                key={experimentAccessionCode}
                dataset={dataset}
                experiment={experiment}
                experimentAccessionCode={experimentAccessionCode}
                defaultOrganismFilterOption={defaultOrganismFilterOption}
                metadataFields={formatSampleMetadata(
                  experiment.sample_metadata
                )}
                isImmutable={isImmutable}
                addedSamples={dataset.data[experimentAccessionCode]}
                setOrganism={setOrganism}
              />
            )
          })}
      </ViewBlocks>
    </>
  )
}

export default ExperimentView
