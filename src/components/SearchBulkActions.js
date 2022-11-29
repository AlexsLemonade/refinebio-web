import { Box, CheckBox, Select as GrommetSelect, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'
import styled from 'styled-components'
import data from 'api/data'

const PageSizeControl = styled(GrommetSelect)`
  width: 36px;
`

const SortByControl = styled(GrommetSelect)`
  width: 160px;
`

export const SearchBulkActions = () => {
  return (
    <Box pad={{ bottom: 'medium' }}>
      <Row margin={{ bottom: 'small' }}>
        <Row align="center">
          Showing
          <PageSizeControl
            defaultValue={data.SearchBulkActions.PAGE_SIZES[0]}
            options={data.SearchBulkActions.PAGE_SIZES}
            margin={{ horizontal: 'xxsmall' }}
          />
          <Text>of {data.SearchBulkActions.totalResults} results</Text>
        </Row>
        <Row align="center">
          Sort by
          <SortByControl
            defaultValue={data.SearchBulkActions.SORTBY_OPTIONS[0]}
            options={data.SearchBulkActions.SORTBY_OPTIONS}
            margin={{ horizontal: 'xxsmall' }}
          />
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
