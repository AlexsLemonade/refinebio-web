import { useState } from 'react'
import { Box, CheckBox, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'

export const SearchBulkActions = ({ results }) => {
  const { count: totalResults } = results
  const pageSizes = [10, 20, 50]
  const sortByOptions = [
    {
      label: 'Best Match',
      value: '_score'
    },
    {
      label: 'Most No. of samples',
      value: '-num_downloadable_samples'
    },
    {
      label: 'Least No. of samples',
      value: 'num_downloadable_samples'
    },
    {
      label: 'Newest Experiment',
      value: '-source_first_published'
    },
    {
      label: 'Oldest Experiment',
      value: 'source_first_published'
    }
  ]
  const [selectedSortByOption, setSelectedSortByOption] = useState(
    sortByOptions[0].value
  )

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
              options={Object.values(sortByOptions)}
              labelKey="label"
              value={selectedSortByOption}
              valueKey={{ key: 'value', reduce: true }}
              margin={{ horizontal: 'xxsmall' }}
              onChange={({ value: nextValue }) =>
                setSelectedSortByOption(nextValue)
              }
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
