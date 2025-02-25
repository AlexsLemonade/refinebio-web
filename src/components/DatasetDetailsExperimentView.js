import { useEffect, useState } from 'react'
import { DatasetDetailsExperimentViewBlock } from 'components//DatasetDetailsExperimentViewBlock'
import { DatasetDetailsViewBlocks } from 'components/DatasetDetailsViewBlocks'
import { ExperimentViewOrganismFilter } from 'components/DatasetDetailsExperimentViewOrganismFilter'

export const DatasetDetailsExperimentView = ({ dataset, isImmutable }) => {
  const defaultOption = { label: 'All Speciess', value: 'ALL' }
  const [organism, setOrganism] = useState(defaultOption.value)
  const filteredExperiments = dataset.experiments.filter(
    (experiment) =>
      organism === defaultOption.value ||
      experiment.organism_names.includes(organism)
  )

  // resets the organism filter to default on dataset change
  useEffect(() => {
    setOrganism(defaultOption.value)
  }, [dataset])

  return (
    <>
      {Object.keys(dataset.organism_samples).length > 1 && (
        <ExperimentViewOrganismFilter
          dataset={dataset}
          defaultOption={defaultOption}
          organism={organism}
          setOrganism={setOrganism}
        />
      )}
      <DatasetDetailsViewBlocks elevation="medium" pad="medium">
        {filteredExperiments.map((experiment) => (
          <DatasetDetailsExperimentViewBlock
            key={experiment.accession_code}
            dataset={dataset}
            experiment={experiment}
            isImmutable={isImmutable}
          />
        ))}
      </DatasetDetailsViewBlocks>
    </>
  )
}

export default DatasetDetailsExperimentView
