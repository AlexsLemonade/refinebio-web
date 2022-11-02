import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import styled from 'styled-components'
import { SearchIcon } from '../../images/search.svg'

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: row;
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

export const SearchBox = ({
  large = false,
  w,
  primary = false,
  secondary = false,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper large={large} role="search" {...props} width={`calc(${w} - 16px)`}>
      <FormField a11yTitle="Search" htmlFor="search" fill>
        <Box>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Input id="search" type="search" {...props} />
          <SearchIcon />
        </Box>
      </FormField>
      {large && (
        <Button
          label="Search"
          type="submit"
          primary={primary}
          secondary={secondary}
        />
      )}
    </Wrapper>
  )
}

export default SearchBox
