import { useState, useEffect, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'

export const SearchFilterList = ({ facets, filter, setFilter }) => {
  const { viewport, setResponsive } = useResponsive()
  // The order of the filters to render in UI
  const filterOrder = [
    {
      label: 'Organism',
      key: 'downloadable_organism_names',
      parameter: 'downloadable_organism'
    },
    { label: 'Technology', key: 'technology', parameter: 'technology' },
    {
      label: 'Platforms',
      key: 'platform_accession_codes',
      parameter: 'platform'
    }
  ]
  const [filterGroup, setFilterGroup] = useState({})
  const [checked, setChecked] = useState([])

  const handleClearAll = () => {
    setFilter({})
    setChecked([])
  }

  useEffect(() => {
    setFilterGroup(() => filterOrder.map((f) => facets[f.key]))
  }, [facets])

  return (
    <Box>
      <Box
        align="center"
        direction="row"
        justify="between"
        margin={{ bottom: 'medium' }}
        fill
      >
        <Heading level={3} size={setResponsive('h3_small', 'medium')}>
          Filters
        </Heading>
        <Button
          label="Clear All"
          link
          linkFontSize={setResponsive('medlum', 'medlum', 'small')}
          onClick={handleClearAll}
        />
      </Box>
      {filterOrder.map((f, i, arr) => (
        <Box
          key={f.key}
          border={
            !isLastIndex(i, arr)
              ? {
                  color: 'gray-shade-40',
                  side: 'bottom'
                }
              : null
          }
          margin={{ bottom: 'medium' }}
          pad={{ bottom: !isLastIndex(i, arr) ? 'medium' : 'none' }}
        >
          {!isEmptyObject(filterGroup[i]) && (
            <SearchFilter
              checked={checked}
              filter={filter}
              filterGroup={filterGroup[i]}
              filterParam={f.parameter}
              label={f.label}
              setChecked={setChecked}
              setFilter={setFilter}
            />
          )}
        </Box>
      ))}
      {viewport !== 'large' && (
        <Button label="Apply Filters" primary responsive />
      )}
    </Box>
  )
}

export default memo(SearchFilterList)
