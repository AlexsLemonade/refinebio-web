import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'
import { options } from 'config'

export const NonDownloadableExperiment = () => {
  const { search, toggleFilter } = useSearchManager()
  const { key } = options.search.numDownloadableSamples
  const checked = Number(search[key]) === 0

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={checked}
      onChange={(e) => toggleFilter(e.target.checked, key)}
    />
  )
}

export default NonDownloadableExperiment
