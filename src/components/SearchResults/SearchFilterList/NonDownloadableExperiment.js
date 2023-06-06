import { useSearchManager } from 'hooks/useSearchManager'
import { CheckBox } from 'grommet'

// the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
// NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
// with `num_downloadable_samples__gt: 0`
export const NonDownloadableExperiment = ({ filterParam = 'empty' }) => {
  const { filters, setFilters, pushFilter } = useSearchManager()

  const toggleFilter = (e) => {
    if (e.target.checked) {
      setFilters(() => {
        const temp = { ...filters }
        delete temp[filterParam]
        pushFilter(temp)
        return { ...temp }
      })
    } else {
      setFilters(() => {
        const temp = { ...filters }

        temp[filterParam] = true
        pushFilter(temp)
        return { ...temp }
      })
    }
  }

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={!filters[filterParam]}
      onChange={(e) => toggleFilter(e)}
    />
  )
}

export default NonDownloadableExperiment
