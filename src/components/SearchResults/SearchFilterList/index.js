import { Fragment, useState, useEffect, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { FilterIncludePublication } from './FilterIncludePublication'

export const SearchFilterList = ({
  checkedFilter,
  facets,
  filter,
  setCheckedFilter,
  setFilter,
  handleClearAll
}) => {
  const { viewport, setResponsive } = useResponsive()
  // The order of the filters to render in UI
  const filterIncludePublication = {
    label: 'Includes Publication',
    key: 'has_publication',
    parameter: 'has_publication'
  }

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
    },
    filterIncludePublication
  ]

  const [filterGroup, setFilterGroup] = useState({})

  const toggleCheckBox = (e, param, val) => {
    const item = param === filterIncludePublication.parameter ? param : val

    if (e.target.checked) {
      setCheckedFilter([...checkedFilter, item])
    } else {
      setCheckedFilter(checkedFilter.filter((element) => element !== item))
    }
  }

  const toggleFilter = (e, param, val) => {
    if (e.target.checked) {
      setFilter(() => {
        const temp = { ...filter }
        if (temp[param] !== undefined) {
          temp[param].push(val)
        } else {
          temp[param] = [val]
        }

        return { ...temp }
      })
    } else {
      setFilter(() => {
        const temp = { ...filter }

        if (temp[param].length > 0) {
          temp[param] = temp[param].filter((item) => item !== val)
          if (temp[param].length === 0) delete temp[param]
        }

        return { ...temp }
      })
    }
  }

  const handleToggle = (e, param, val) => {
    toggleCheckBox(e, param, val)
    toggleFilter(e, param, val)
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
          linkFontSize="medium"
          onClick={handleClearAll}
        />
      </Box>
      {filterOrder.map((f, i, arr) => (
        <Fragment key={f.key}>
          {!isEmptyObject(filterGroup[i]) &&
            f.parameter !== filterIncludePublication.parameter && (
              <Box
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
                <SearchFilter
                  checkedFilter={checkedFilter}
                  filterGroup={filterGroup[i]}
                  filterParam={f.parameter}
                  label={f.label}
                  handleToggle={handleToggle}
                />
              </Box>
            )}

          {f.parameter === filterIncludePublication.parameter && (
            <FilterIncludePublication
              checked={checkedFilter.includes(
                filterIncludePublication.parameter
              )}
              filterParam={filterIncludePublication.parameter}
              label={filterIncludePublication.label}
              handleToggle={handleToggle}
            />
          )}
        </Fragment>
      ))}

      {viewport !== 'large' && (
        <Button label="Apply Filters" primary responsive />
      )}
    </Box>
  )
}

export default memo(SearchFilterList)
