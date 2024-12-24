import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'components/shared/CheckBox'
import { options } from 'config'

export const NonDownloadableExperiment = () => {
  const { searchParams, toggleFilter } = useSearchManager()
  const { key } = options.search.numDownloadableSamples
  const checked = Number(searchParams[key]) === 0

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={checked}
      onChange={(e) => toggleFilter(e.target.checked, key)}
    />
  )
}

export default NonDownloadableExperiment
