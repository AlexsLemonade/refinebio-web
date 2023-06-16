import { Fragment, useEffect, useState } from 'react'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import isEmptyObject from 'helpers/isEmptyObject'
import isLastIndex from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { IncludePublication } from './IncludePublication'

export const SearchFilterList = ({ facets, setToggle }) => {
  const { filters, clearAllFilters, formatFacetNames, updateSearchQuery } =
    useSearchManager()
  const { viewport } = useResponsive()
  const [filterGroup, setFilterGroup] = useState({})
  const isFilterSelected =
    formatFacetNames(Object.keys(facets)).filter((facet) =>
      Object.keys(filters).includes(facet)
    ).length > 0
  const filterIncludePublication = {
    label: 'Includes Publication',
    key: 'has_publication',
    option: 'has_publication'
  }
  // The order of the filters to render in UI
  const filterOrder = [
    {
      label: 'Organism',
      key: 'downloadable_organism_names',
      option: 'downloadable_organism'
    },
    { label: 'Technology', key: 'technology', option: 'technology' },
    {
      label: 'Platforms',
      key: 'platform_accession_codes',
      option: 'platform'
    },
    filterIncludePublication
  ]

  const handleApplyFilters = () => {
    setToggle(false)
    updateSearchQuery(true, filters)
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
        <Heading level={2} responsive={false}>
          Filters
        </Heading>
        <Button
          disabled={!isFilterSelected}
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
                filterOption={f.option}
                filterLabel={f.label}
              />
            </Box>
          )}
        </Fragment>
      ))}

      {!isEmptyObject(filterGroup) && (
        <IncludePublication
          filterGroup={filterGroup[filterGroup.length - 1]}
          filterOption={filterIncludePublication.option}
          filterLabel={`${filterIncludePublication.label}`}
        />
      )}

      {viewport !== 'large' && (
        <Box margin={{ top: 'small', bottom: 'large' }} width="100%">
          <Button
            label="Apply Filters"
            primary
            responsive
            onClick={handleApplyFilters}
          />
        </Box>
      )}
    </Box>
  )
}

export default SearchFilterList
