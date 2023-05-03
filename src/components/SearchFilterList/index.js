import { useState, useEffect } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { isLastIndex } from 'helpers/isLastIndex'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from './SearchFilter'

export const SearchFilterList = ({ facets = {} }) => {
  const { viewport, setResponsive } = useResponsive()
  // The order of the filters to render in UI
  const filterOrder = [
    { label: 'Organism', type: 'downloadable_organism_names' },
    { label: 'Technology', type: 'technology' },
    { label: 'Platforms', type: 'platform_accession_codes' }
  ]
  const [filterGroup, setFilterGroup] = useState({})

  useEffect(() => {
    setFilterGroup(() => filterOrder.map((f) => facets[f.type]))
  }, [])

  return (
    <Box>
      <Box
        align="center"
        direction="row"
        justify="between"
        margin={{ bottom: 'medium' }}
        fill
      >
        <Heading level={3} size={setResponsive('h3Small', 'medium')}>
          Filters
        </Heading>
        <Button
          label="Clear All"
          link
          linkFontSize={setResponsive('medlum', 'medlum', 'small')}
        />
      </Box>
      {filterOrder.map((f, i, arr) => (
        <Box
          key={f.type}
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
          {filterGroup[i] && (
            <SearchFilter
              filterOrder={filterOrder}
              filterGroup={filterGroup[i]}
              label={f.label}
            />
          )}
        </Box>
      ))}
      {viewport !== 'large' && (
        <Button label="Apply Filters" primary responsive />
      )}
    </Box>
  )
}

export default SearchFilterList
