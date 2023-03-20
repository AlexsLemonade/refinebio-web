import { Fragment, useState, useEffect, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { FilterIncludePublication } from './FilterIncludePublication'

export const SearchFilterList = ({
  facets,
  filter,
  setFilter,
  handleClearAll
}) => {
  const { viewport, setResponsive } = useResponsive()
  const [filterGroup, setFilterGroup] = useState({})
  const filterIncludePublication = {
    label: 'Includes Publication',
    key: 'has_publication',
    parameter: 'has_publication'
  }
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
    },
    filterIncludePublication
  ]

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
          disabled={isEmptyObject(filter)}
          label="Clear All"
          link
          linkFontSize="medium"
          onClick={handleClearAll}
        />
      </Box>
      {filterOrder.map((f, i, arr) => (
        <Fragment key={f.key}>
          {!isEmptyObject(filterGroup[i]) && !isLastIndex(i, arr) && (
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
                filter={filter}
                filterGroup={filterGroup[i]}
                filterParam={f.parameter}
                filterLabel={f.label}
                toggleFilter={toggleFilter}
              />
            </Box>
          )}
        </Fragment>
      ))}

      {!isEmptyObject(filterGroup) && (
        <FilterIncludePublication
          filter={filter}
          filterGroup={filterGroup[filterGroup.length - 1]}
          filterParam={filterIncludePublication.parameter}
          filterLabel={`${filterIncludePublication.label}`}
          toggleFilter={toggleFilter}
        />
      )}

      {viewport !== 'large' && (
        <Button label="Apply Filters" primary responsive />
      )}
    </Box>
  )
}

export default memo(SearchFilterList)
