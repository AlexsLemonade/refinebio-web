import { Fragment } from 'react'
import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { getTranslateKeysinFacets } from 'helpers/facetNameTranslation'
import isLastIndex from 'helpers/isLastIndex'
import { Button } from 'components/shared/Button'
import getReadable from 'helpers/getReadable'
import formatNumbers from 'helpers/formatNumbers'
import { SearchFilter } from './SearchFilter'
import { SearchBooleanFilter } from './SearchBooleanFilter'

export const SearchFilterList = ({
  facets: apiFacets,
  onToggle = () => {}
}) => {
  const { viewport } = useResponsive()
  const { canClearFilter, clearAllFilters } = useSearchManager()

  // NOTE: We need to rename facet keys to match filter
  // We'll remove this in the future (1/16/2025)
  const facets = getTranslateKeysinFacets(apiFacets)
  // The order of the facets to render in UI
  const filterOrder = [
    'downloadable_organism',
    'technology',
    'platform',
    'has_publication'
  ]

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
          disabled={!canClearFilter}
          label="Clear All"
          link
          linkFontSize="medium"
          onClick={clearAllFilters}
        />
      </Box>
      {filterOrder.map((filter, i, arr) => (
        <Fragment key={filter}>
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
            {filter === 'has_publication' ? (
              <SearchBooleanFilter
                facet={facets[filter]}
                filter={filter}
                label={`${getReadable(filter)} (${
                  formatNumbers(facets[filter].true) || 0
                })`}
              />
            ) : (
              <SearchFilter facet={facets[filter]} filter={filter} />
            )}
          </Box>
        </Fragment>
      ))}

      {viewport !== 'large' && (
        <Box margin={{ top: 'small', bottom: 'large' }} width="100%">
          <Button label="Apply Filters" primary responsive onClick={onToggle} />
        </Box>
      )}
    </Box>
  )
}

export default SearchFilterList
