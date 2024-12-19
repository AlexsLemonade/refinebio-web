import { Fragment } from 'react'
import { Box, Heading } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import { useResponsive } from 'hooks/useResponsive'
import getReadable from 'helpers/getReadable'
import isEmptyObject from 'helpers/isEmptyObject'
import isLastIndex from 'helpers/isLastIndex'
import { options } from 'config'
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

  const {
    search: { hasPublication }
  } = options

  // The order of the facets to render in UI
  const filterOrder = [
    {
      rawKey: 'downloadable_organism_names',
      option: 'downloadable_organism'
    },
    { rawKey: 'technology', option: 'technology' },
    {
      rawKey: 'platform_accession_codes',
      option: 'platform'
    },
    {
      rawKey: hasPublication.key,
      option: hasPublication.key
    }
  ]

  const filterGroup = filterOrder.map((f) => facets[f.rawKey])

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
        <Fragment key={f.rawKey}>
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
                filterRawKey={f.rawKey}
              />
            </Box>
          )}
        </Fragment>
      ))}

      {!isEmptyObject(filterGroup) && (
        <IncludePublication
          filterGroup={filterGroup[filterGroup.length - 1]}
          filterOption={hasPublication.key}
          filterLabel={`${getReadable(hasPublication.key)}`}
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
