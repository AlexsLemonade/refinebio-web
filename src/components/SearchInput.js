import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import styled from 'styled-components'
import { SearchIcon } from '../images/search.svg'

const Wrapper = styled(Box)`
  div {
    position: relative;
  }
  input {
    &::-webkit-search-cancel-button {
      display: none;
    }
  }
  svg {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  ${({ large }) =>
    large &&
    `
      width: calc(586px - 16px);
      button {
        height: 40px;
        margin-left: 16px;
        width: 96px;
      }
      input {
        height: 40px;
        padding: 8px 16px;
      }
      svg {
       display:none;
      }
   `}
`

export const SearchInput = ({ large = false, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper direction="row" large={large} role="search" {...props}>
      <FormField a11yTitle="Search" htmlFor="search" fill>
        <Box>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Input id="search" type="search" {...props} />
          <SearchIcon />
        </Box>
      </FormField>
      {large && <Button label="Search" type="submit" secondary />}
    </Wrapper>
  )
}

export default SearchInput
