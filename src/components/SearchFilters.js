import { useState, useEffect } from 'react'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { SearchFilter } from 'components/SearchFilter'
import data from 'api/data'

export const SearchFilters = () => {
  // The preferred order of the filters to render in UI
  const filterOrder = [
    { label: 'Organism', type: 'organism' },
    { label: 'Technology', type: 'technology' },
    { label: 'Platforms', type: 'platforms' }
  ]

  const [filterGroup, setFilterGroup] = useState({})
  useEffect(() => {
    const temp = filterOrder.map((f) => data.SearchFilters[f.type])
    setFilterGroup(temp)
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
        <Heading level={3}>Filters</Heading>
        <Button label="clear all" link />
      </Box>
      {filterOrder.map((f, i, arr) => (
        <Box
          key={f.type}
          border={
            i !== arr.length - 1
              ? {
                  color: 'gray-shade-40',
                  side: 'bottom'
                }
              : null
          }
          margin={{ bottom: 'medium' }}
          pad={{ bottom: 'medium' }}
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
      <Box />
    </Box>
  )
}

export default SearchFilters
