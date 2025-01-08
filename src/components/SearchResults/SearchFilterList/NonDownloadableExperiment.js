import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'
import { options } from 'config'

export const NonDownloadableExperiment = () => {
  const { searchParams, toggleFilter } = useSearchManager()
  const { numDownloadableSamples } = options.search
  const checked =
    searchParams[numDownloadableSamples.key] === numDownloadableSamples.exclude

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={checked}
      onChange={(e) =>
        toggleFilter(e.target.checked, numDownloadableSamples.key)
      }
    />
  )
}

export default NonDownloadableExperiment
