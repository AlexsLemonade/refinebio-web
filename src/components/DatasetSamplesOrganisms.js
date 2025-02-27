import { Box } from 'grommet'
import { DatasetSamplesOrganism } from 'components/DatasetSamplesOrganism'

export const DatasetSamplesOrganisms = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples } = dataset
  const organismsNames = Object.keys(organismSamples)

  return (
    <Box elevation="medium" pad="medium">
      {organismsNames.map((organismName, i, arr) => (
        <Box
          key={organismName}
          margin={{ bottom: i !== arr.length - 1 ? 'small' : '0' }}
          pad={{ bottom: i !== arr.length - 1 ? 'small' : '0' }}
          border={{
            color: 'gray-shade-40',
            side: 'bottom',
            style: 'solid',
            size: i !== arr.length - 1 ? '1px' : 'none'
          }}
        >
          <DatasetSamplesOrganism
            dataset={dataset}
            organismName={organismName}
            isImmutable={isImmutable}
          />
        </Box>
      ))}
    </Box>
  )
}

export default DatasetSamplesOrganisms
