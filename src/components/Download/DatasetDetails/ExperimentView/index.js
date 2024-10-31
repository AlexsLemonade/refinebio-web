import { useState } from 'react'
import { OrganismFilter } from './OrganismFilter'
import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const ExperimentView = ({ dataset, isImmutable }) => {
  const defaultOrganismFilterOption = { label: 'All Speciess', value: 'ALL' }
  const [organism, setOrganism] = useState(defaultOrganismFilterOption.value)
  const filteredExperiments = dataset.experiments.filter(
    (experiment) =>
      organism === defaultOrganismFilterOption.value ||
      experiment.organism_names.includes(organism)
  )

  return (
    <>
      <OrganismFilter
        dataset={dataset}
        defaultOption={defaultOrganismFilterOption}
        organism={organism}
        setOrganism={setOrganism}
      />
      <ViewBlocks elevation="medium" pad="medium">
        {filteredExperiments.map((experiment) => (
          <ViewBlock
            key={experiment.accession_code}
            dataset={dataset}
            experiment={experiment}
            defaultOrganismFilterOption={defaultOrganismFilterOption}
            isImmutable={isImmutable}
            setOrganism={setOrganism}
          />
        ))}
      </ViewBlocks>
    </>
  )
}

export default ExperimentView
