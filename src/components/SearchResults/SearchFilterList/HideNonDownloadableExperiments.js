import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'
import { options } from 'config'

export const HideNonDownloadableExperiments = () => {
  const { searchParams, updateSearchParam } = useSearchManager()
  const { numDownloadableSamples } = options.search
  const values = {
    checked: numDownloadableSamples.exclude,
    unchecked: numDownloadableSamples.include
  }
  const checked = searchParams[numDownloadableSamples.key] === values.checked

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={checked}
      onChange={(e) =>
        updateSearchParam(
          numDownloadableSamples.key,
          e.target.checked ? values.checked : values.unchecked
        )
      }
    />
  )
}

export default HideNonDownloadableExperiments
