import { Fragment, useState, useEffect, memo } from 'react'
import { useFilter } from 'hooks/useFilter'
import { useResponsive } from 'hooks/useResponsive'
import { getHeadingSize } from 'helpers/getHeadingSize'
import { isEmptyObject } from 'helpers/isEmptyObject'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { FilterIncludePublication } from './FilterIncludePublication'

export const SearchFilterList = ({ facets }) => {
  const { filter, clearAllFilter } = useFilter()
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
        <Heading
          level={3}
          size={setResponsive(getHeadingSize('small', 3), 'medium')}
        >
          Filters
        </Heading>
        <Button
          disabled={isEmptyObject(filter)}
          label="Clear All"
          link
          linkFontSize="medium"
          onClick={clearAllFilter}
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
                filterGroup={filterGroup[i]}
                filterParam={f.parameter}
                filterLabel={f.label}
              />
            </Box>
          )}
        </Fragment>
      ))}

      {!isEmptyObject(filterGroup) && (
        <FilterIncludePublication
          filterGroup={filterGroup[filterGroup.length - 1]}
          filterParam={filterIncludePublication.parameter}
          filterLabel={`${filterIncludePublication.label}`}
        />
      )}

      {viewport !== 'large' && (
        <Button label="Apply Filters" primary responsive />
      )}
    </Box>
  )
}

export default memo(SearchFilterList)
