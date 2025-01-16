import { Fragment } from 'react'
import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import { getTranslateKeysinFacets } from 'helpers/facetNameTranslation'
import isLastIndex from 'helpers/isLastIndex'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'
import { IncludePublication } from './IncludePublication'

export const SearchFilterList = ({ facets: apiFacets, onToggle }) => {
  const { viewport } = useResponsive()
  const { clearAllFilters, hasNonDownloadableSamples, hasSelectedFacets } =
    useSearchManager()

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
          disabled={!hasSelectedFacets && !hasNonDownloadableSamples}
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
              <IncludePublication facet={facets[filter]} filter={filter} />
            ) : (
              <SearchFilter facet={facets[filter]} filter={filter} />
            )}
          </Box>
        </Fragment>
      ))}

      {viewport !== 'large' && (
        <Box margin={{ top: 'small', bottom: 'large' }} width="100%">
          <Button
            label="Apply Filters"
            primary
            responsive
            onClick={() => onToggle(false)}
          />
        </Box>
      )}
    </Box>
  )
}

export default SearchFilterList
