import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { DatasetSamplesExperiment } from 'components/DatasetSamplesExperiment'
import { DatasetSamplesExperimentsOrganismFilter } from 'components/DatasetSamplesExperimentsOrganismFilter'

export const DatasetSamplesExperiments = ({ dataset, isImmutable }) => {
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
        <DatasetSamplesExperimentsOrganismFilter
          dataset={dataset}
          defaultOption={defaultOption}
          organism={organism}
          setOrganism={setOrganism}
        />
      )}
      <Box elevation="medium" pad="medium">
        {filteredExperiments.map((experiment, i, arr) => (
          <Box
            key={experiment.accession_code}
            margin={{ bottom: i !== arr.length - 1 ? 'small' : '0' }}
            pad={{ bottom: i !== arr.length - 1 ? 'small' : '0' }}
            border={{
              color: 'gray-shade-40',
              side: 'bottom',
              style: 'solid',
              size: i !== arr.length - 1 ? '1px' : 'none'
            }}
          >
            <DatasetSamplesExperiment
              dataset={dataset}
              experiment={experiment}
              isImmutable={isImmutable}
            />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default DatasetSamplesExperiments

// border={i === 0 ? false : { side: 'top' }}
