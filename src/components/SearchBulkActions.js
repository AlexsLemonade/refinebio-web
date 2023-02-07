import { getHumanReadable } from 'helpers/getHumanReadable'
import { Box, CheckBox, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'

export const SearchBulkActions = ({ results }) => {
  const pageSizes = [10, 20, 50]

  // the order vlaues for API
  const orders = [
    '_score',
    '-num_downloadable_samples',
    'num_downloadable_samples',
    '-source_first_published',
    'source_first_published'
  ]

  const sortByOptions = orders.map((order) => getHumanReadable(order))

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
              defaultValue={sortByOptions[0]}
              options={sortByOptions}
              margin={{ horizontal: 'xxsmall' }}
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
