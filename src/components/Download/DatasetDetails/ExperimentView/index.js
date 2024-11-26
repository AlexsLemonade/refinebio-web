import { useEffect, useState } from 'react'
import { OrganismFilter } from './OrganismFilter'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const ExperimentView = ({ dataset, isImmutable }) => {
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
        <OrganismFilter
          dataset={dataset}
          defaultOption={defaultOption}
          organism={organism}
          setOrganism={setOrganism}
        />
      )}
      <ViewBlocks elevation="medium" pad="medium">
        {filteredExperiments.map((experiment) => (
          <ViewBlock
            key={experiment.accession_code}
            dataset={dataset}
            experiment={experiment}
            isImmutable={isImmutable}
          />
        ))}
      </ViewBlocks>
    </>
  )
}

export default ExperimentView
