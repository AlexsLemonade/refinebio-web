import { useState } from 'react'
import { getHumanReadable } from 'helpers/getHumanReadable'
import { Box, CheckBox, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'

export const SearchBulkActions = ({ results }) => {
  const pageSizes = [10, 20, 50]
  // the sort by option values for API and client (human-redable text)
  const sortByOptionValues = {
    _score: 'Best Match',
    '-num_downloadable_samples': 'Most No. of samples',
    num_downloadable_samples: 'Least No. of samples',
    '-source_first_published': 'Newest Experiment',
    source_first_published: 'Oldest Experiment'
  }

  const sortByOptions = Object.keys(sortByOptionValues).map((order) =>
    getHumanReadable(order, sortByOptionValues)
  )

  // NOTE: when calling API, use helpers/getAPIReadable to get the API value
  // e.g.) getAPIReadable(selectedSortByOption, sortByOptionValues)
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    sortByOptions[0]
  )

  const { count: totalResults } = results

  return (
    <Box pad={{ bottom: 'medium' }}>
      <Row margin={{ bottom: 'small' }}>
        <Row align="center">
          Showing
          <Box width="88px">
            <Select
              defaultValue={pageSizes[0]}
              options={pageSizes}
              margin={{ horizontal: 'xxsmall' }}
            />
          </Box>
          <Text>of {totalResults.toLocaleString()} results</Text>
        </Row>
        <Row align="center">
          Sort by
          <Box width="208px">
            <Select
              options={sortByOptions}
              value={selectedSortByOption}
              margin={{ horizontal: 'xxsmall' }}
              onChange={({ option }) => setSelectedSortByOption(option)}
            />
          </Box>
        </Row>
        <Box>
          <Button label="Add Page to Dataset" secondary />
        </Box>
      </Row>
      <Box>
        <CheckBox label="Hide non-downloadable experiments" />
      </Box>
    </Box>
  )
}

export default SearchBulkActions
