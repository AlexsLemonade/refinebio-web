import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'
import { options } from 'config'

export const NonDownloadableExperiment = () => {
  const { search, toggleFilter } = useSearchManager()
  const { numDownloadableSamples } = options.search
  const checked =
    Number(search[numDownloadableSamples.key]) ===
    numDownloadableSamples.exclude

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
