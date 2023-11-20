import { useState } from 'react'
import { Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { OrganismFilter } from './OrganismFilter'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const ExperimentView = ({
  dataset: {
    data: datasetData,
    id: datasetId,
    experiments,
    quantile_normalize: quantileNormalize
  },
  isImmutable
}) => {
  const { formatSampleMetadata } = useDatasetManager()
  const defaultOrganismFilterOption = { label: 'All Speciess', value: 'ALL' }
  const [organism, setOrganism] = useState(defaultOrganismFilterOption.value)

  if (!datasetData || !Object.keys(datasetData).length) {
    return <Paragraph>No samples added to download dataset.</Paragraph>
  }

  return (
    <>
      <OrganismFilter
        datasetData={datasetData}
        defaultOption={defaultOrganismFilterOption}
        experiments={experiments}
        organism={organism}
        setOrganism={setOrganism}
      />
      {experiments && (
        <ViewBlocks elevation="medium" pad="medium">
          {Object.keys(datasetData).map((experimentAccessionCode) => {
            const addedSamples = datasetData[experimentAccessionCode]
            const experiment = experiments[experimentAccessionCode]
            const metadataFields = formatSampleMetadata(
              experiment.sample_metadata
            )

            if (
              organism !== 'ALL' &&
              !experiment.organism_names.includes(organism)
            ) {
              return null
            }

            return (
              <ViewBlock
                key={experimentAccessionCode}
                addedSamples={addedSamples}
                datasetId={datasetId}
                defaultOrganismFilterOption={defaultOrganismFilterOption}
                experiment={experiment}
                experimentAccessionCode={experimentAccessionCode}
                metadataFields={metadataFields}
                quantileNormalize={quantileNormalize}
                isImmutable={isImmutable}
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
