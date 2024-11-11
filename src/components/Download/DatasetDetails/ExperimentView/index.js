import { useState } from 'react'
import { Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import getFormattedExperiments from 'helpers/getFormattedExperiments'
import { OrganismFilter } from './OrganismFilter'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const ExperimentView = ({ dataset, isImmutable }) => {
  const { formatSampleMetadata } = useDatasetManager()
  const defaultOrganismFilterOption = { label: 'All Speciess', value: 'ALL' }
  const defaultValue = 'ALL'
  const formattedExperiments = getFormattedExperiments(dataset)
  const [organism, setOrganism] = useState(defaultOrganismFilterOption.value)

  if (!Object.keys(dataset.data).length) {
    return <Paragraph>No samples added to download dataset.</Paragraph>
  }

  return (
    <>
      <OrganismFilter
        dataset={dataset}
        experiments={formattedExperiments}
        defaultOption={defaultOrganismFilterOption}
        organism={organism}
        setOrganism={setOrganism}
      />
      {formattedExperiments && (
        <ViewBlocks elevation="medium" pad="medium">
          {Object.keys(dataset.data).map((experimentAccessionCode) => {
            const addedSamples = dataset.data[experimentAccessionCode]
            const experiment = formattedExperiments[experimentAccessionCode]
            const metadataFields = formatSampleMetadata(
              experiment.sample_metadata
            )

            if (
              organism !== defaultValue &&
              !experiment.organism_names.includes(organism)
            ) {
              return null
            }

            return (
              <ViewBlock
                key={experimentAccessionCode}
                dataset={dataset}
                experiment={experiment}
                experimentAccessionCode={experimentAccessionCode}
                defaultOrganismFilterOption={defaultOrganismFilterOption}
                metadataFields={metadataFields}
                isImmutable={isImmutable}
                addedSamples={addedSamples}
                setOrganism={setOrganism}
              />
            )
          })}
        </ViewBlocks>
      )}
    </>
  )
}

export default ExperimentView
