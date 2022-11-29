import { Box, CheckBox, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import data from 'api/data'

export const SearchBulkActions = () => {
  return (
    <Box pad={{ bottom: 'medium' }}>
      <Row margin={{ bottom: 'small' }}>
        <Row align="center">
          Showing
          <Box width="88px">
            <Select
              defaultValue={data.SearchBulkActions.PAGE_SIZES[0]}
              options={data.SearchBulkActions.PAGE_SIZES}
              margin={{ horizontal: 'xxsmall' }}
            />
          </Box>
          <Text>of {data.SearchBulkActions.totalResults} results</Text>
        </Row>
        <Row align="center">
          Sort by
          <Box width="208px">
            <Select
              defaultValue={data.SearchBulkActions.SORTBY_OPTIONS[0]}
              options={data.SearchBulkActions.SORTBY_OPTIONS}
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
