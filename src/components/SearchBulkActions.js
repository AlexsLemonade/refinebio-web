import {
  Box,
  CheckBox,
  FormField,
  Select as GrommetSelect,
  Text
} from 'grommet'
import { Button } from 'components/shared/Button'
import styled from 'styled-components'
import data from 'api/data'

const Wrapper = styled(Box)`
  * {
    align-items: center;
    flex-direction: row;
  }
`

const PageSizeControl = styled(GrommetSelect)`
  width: 36px;
`

const SortByControl = styled(GrommetSelect)`
  width: 160px;
`

export const SearchBulkActions = () => {
  return (
    <Wrapper pad={{ bottom: 'medium' }}>
      <Box justify="between" margin={{ bottom: 'small' }}>
        <Box>
          <FormField a11yTitle="Page size" htmlFor="page-size">
            Showing
            <PageSizeControl
              defaultValue={data.SearchBulkActions.PAGE_SIZES[0]}
              id="page-size"
              options={data.SearchBulkActions.PAGE_SIZES}
              margin={{ horizontal: 'xxsmall' }}
            />
          </FormField>
          <Text>of {data.SearchBulkActions.totalResults} results</Text>
        </Box>
        <Box>
          <FormField a11yTitle="Sort by" htmlFor="sort-by">
            Sort by
            <SortByControl
              defaultValue={data.SearchBulkActions.SORTBY_OPTIONS[0]}
              id="sort-by"
              options={data.SearchBulkActions.SORTBY_OPTIONS}
              margin={{ horizontal: 'xxsmall' }}
            />
          </FormField>
        </Box>
        <Box>
          <Button label="Add Page to Dataset" secondary />
        </Box>
      </Box>
      <Box>
        <CheckBox label="Hide non-downloadable experiments" />
      </Box>
    </Wrapper>
  )
}

export default SearchBulkActions
