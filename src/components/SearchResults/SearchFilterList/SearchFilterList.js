import { Fragment, useState, useEffect, memo } from 'react'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import isEmptyObject from 'helpers/isEmptyObject'
import isLastIndex from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { IncludePublication } from './IncludePublication'

export const SearchFilterList = ({ facets }) => {
  const { filters, clearAllFilters } = useSearchManager()
  const { viewport } = useResponsive()
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
        <Heading level={2} responsive={false}>
          Filters
        </Heading>
        <Button
          disabled={isEmptyObject(filters)}
          label="Clear All"
          link
          linkFontSize="medium"
          onClick={clearAllFilters}
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
        <IncludePublication
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
