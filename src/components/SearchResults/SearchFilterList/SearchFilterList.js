import { Fragment } from 'react'
import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import { getTranslateFacetName } from 'helpers/facetNameTranslation'
import sortArrayByKey from 'helpers/sortArrayByKey'
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

  // The order of the facets to render in UI
  const orderPreference = [
    'downloadable_organism',
    'technology',
    'platform',
    'has_publication'
  ]
  // All possible facet options via API response
  const facetOptions = Object.keys(facets).reduce(
    (acc, cur) => [
      ...acc,
      { facetKey: cur, option: getTranslateFacetName(cur) }
    ],
    []
  )

  const filterOrder = sortArrayByKey('option', facetOptions, orderPreference)
  const filterGroup = filterOrder.map((f) => facets[f.facetKey])

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
        <Fragment key={f.facetKey}>
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
                filterLabel={getReadable(f.option)}
                filterOption={f.option}
                facetKey={f.facetKey}
              />
            </Box>
          )}
        </Fragment>
      ))}

      {filterGroup.length && (
        <IncludePublication
          filterGroup={filterGroup[filterGroup.length - 1]}
          filterOption={filterOrder[filterGroup.length - 1].option}
          filterLabel={`${getReadable(
            filterOrder[filterGroup.length - 1].option
          )}`}
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
