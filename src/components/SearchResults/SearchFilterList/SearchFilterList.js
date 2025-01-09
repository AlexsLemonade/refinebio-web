import { Fragment } from 'react'
import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import isEmptyObject from 'helpers/isEmptyObject'
import isLastIndex from 'helpers/isLastIndex'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { IncludePublication } from './IncludePublication'

export const SearchFilterList = ({ facets, setToggle }) => {
  const { viewport } = useResponsive()
  const {
    clearAllFilters,
    hasNonDownloadableSamples,
    hasSelectedFacets,
    updateSearchQuery
  } = useSearchManager()

  const filterIncludePublication = {
    label: 'Includes Publication',
    key: 'has_publication',
    option: 'has_publication'
  }
  // The order of the facets to render in UI
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

  const filterGroup = filterOrder.map((f) => facets[f.key])

  const handleApplyFilters = () => {
    setToggle(false)
    updateSearchQuery(true)
  }

  return (
    <Box>
      <Box
        align="center"
        direction="row"
        justify="between"
        height={{ max: '100%' }}
        margin={{ bottom: 'medium' }}
      >
        <Heading level={2} responsive={false}>
          Filters
        </Heading>
        <Button
          disabled={!hasSelectedFacets && !hasNonDownloadableSamples}
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
                filterLabel={f.label}
                filterOption={f.option}
                filterKey={f.key}
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
