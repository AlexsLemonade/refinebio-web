import { ViewBlock } from './ViewBlock'
import { ViewBlocks } from '../ViewBlocks'

export const SpeciesView = ({ dataset, isImmutable }) => {
  const { organism_samples: organismSamples } = dataset
  const organismsNames = Object.keys(organismSamples)

  return (
    <ViewBlocks elevation="medium" pad="medium">
      {organismsNames.map((organismName) => {
        return (
          <ViewBlock
            key={organismName}
            dataset={dataset}
            organismName={organismName}
            isImmutable={isImmutable}
          />
        )
      })}
    </ViewBlocks>
  )
}

export default SpeciesView
