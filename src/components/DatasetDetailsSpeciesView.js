import { DetasetDetailsSpeciesViewBlock } from 'components/DetasetDetailsSpeciesViewBlock'
import { DatasetDetailsViewBlocks } from 'components/DatasetDetailsViewBlocks'

export const DatasetDetailsSpeciesView = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples } = dataset
  const organismsNames = Object.keys(organismSamples)

  return (
    <DatasetDetailsViewBlocks elevation="medium" pad="medium">
      {organismsNames.map((organismName) => {
        return (
          <DetasetDetailsSpeciesViewBlock
            key={organismName}
            dataset={dataset}
            organismName={organismName}
            isImmutable={isImmutable}
          />
        )
      })}
    </DatasetDetailsViewBlocks>
  )
}

export default DatasetDetailsSpeciesView
