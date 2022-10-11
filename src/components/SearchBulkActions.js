import { Box, CheckBox, Select, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import styled from 'styled-components'
import data from 'api/data'

const Wrapper = styled(Box)`
  padding-bottom: 24px;

  * {
    align-items: center;
    flex-direction: row;
  }

  > div:first-child {
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 16px;
    .select {
      &__page-size {
        button {
          input {
            width: 36px;
          }
        }
      }
      &__sortby {
        button {
          input {
            width: 160px;
          }
        }
      }
    }
  }
`

export const SearchBulkActions = () => {
  return (
    <Wrapper>
      <Box>
        <Box className="select__page-size">
          <Text>Showing</Text>
          <Select
            defaultValue={data.SearchBulkActions.PAGE_SIZES[0]}
            options={data.SearchBulkActions.PAGE_SIZES}
            margin={{ horizontal: 'xxsmall' }}
          />
          <Text>of {data.SearchBulkActions.totalResults} results</Text>
        </Box>
        <Box className="select__sortby">
          <Text>Sort by</Text>
          <Select
            defaultValue={data.SearchBulkActions.SORTBY_OPTIONS[0]}
            options={data.SearchBulkActions.SORTBY_OPTIONS}
            margin={{ horizontal: 'xxsmall' }}
          />
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
