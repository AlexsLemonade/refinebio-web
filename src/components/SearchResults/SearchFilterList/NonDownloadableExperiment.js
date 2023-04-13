import { useSearch } from 'hooks/useSearch'
import { CheckBox } from 'grommet'

// the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
// NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
// with `num_downloadable_samples__gt: 0`
export const NonDownloadableExperiment = ({ filterParam = 'empty' }) => {
  const { filter, setFilter } = useSearch()

  const toggleFilter = (e) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }
        delete temp[filterParam]

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        temp[filterParam] = true

        return { ...temp }
      })
    }
  }

  return (
    <CheckBox
      label="Hide non-downloadable experiments"
      checked={!filter[filterParam]}
      onChange={(e) => toggleFilter(e)}
    />
  )
}

export default NonDownloadableExperiment
