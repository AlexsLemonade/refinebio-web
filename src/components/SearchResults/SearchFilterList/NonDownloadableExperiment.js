import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'grommet'

// the special quary string '?empty=true' is used in FE-only to toggle the `num_downloadable_samples__gt` value
// - its value is 0 by default which excludes non-doownloadable samples from API results
// - when it sets to -1, it includes non-doownloadable samples
export const NonDownloadableExperiment = ({ key = 'empty' }) => {
  const { search, toggleFilter } = useSearchManager()

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={!search[key]}
      onChange={(e) => toggleFilter(e.target.checked, key)}
    />
  )
}

export default NonDownloadableExperiment
