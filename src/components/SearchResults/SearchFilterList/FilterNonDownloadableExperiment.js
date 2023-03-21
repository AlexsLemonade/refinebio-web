import { useFilter } from 'hooks/useFilter'
import { CheckBox } from 'grommet'

// the quary pamaeter '?empty=true' used in FE-only to toggle the non-downloadable samples
// NOTE: if this is not present, we hide the non-downkoadalbe samples by querying the API
// with `num_downloadable_samples__gt: 0`
export const FilterNonDownloadableExperiment = ({ filterParam = 'empty' }) => {
  const { filter, setFilter } = useFilter()

  const toggleFilter = (e) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }

        temp.num_downloadable_samples__gt = 0
        delete temp[filterParam]

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        temp[filterParam] = true
        delete temp.num_downloadable_samples__gt

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

export default FilterNonDownloadableExperiment
