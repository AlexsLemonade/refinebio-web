import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'grommet'

// the special quary string '?empty=true' is used in FE-only to toggle the non-downloadable samples filter
// - by default, non-doownloadable samples are excluded in API response by sending `num_downloadable_samples__gt: 0`
// - by appending this query string, it removes `num_downloadable_samples__gt: 0` to include non-doownloadable samples
export const NonDownloadableExperiment = ({ param = 'empty' }) => {
  const { filters, toggleNonDownloadableFilter } = useSearchManager()

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={!filters[param]}
      onChange={(e) => toggleNonDownloadableFilter(e, param)}
    />
  )
}

export default NonDownloadableExperiment
