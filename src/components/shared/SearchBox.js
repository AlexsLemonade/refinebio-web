import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import styled from 'styled-components'
import { SearchIcon } from '../../images/search.svg'

const Wrapper = styled(Box)`
  width: 100%;

  > div {
    &:first-child {
      width: calc(100% - 96px);
    }
    position: relative;
  }
  input {
    flex: 1 0 0;
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
  ${({ size }) =>
    size &&
    `
    button {
      padding:${size === 'xlarge' ? '10px 20px' : '4px 16px'};
      width: 96px;
    }
    input {
      padding: ${size === 'xlarge' ? '22px' : '16px'};
      font-size: ${size === 'xlarge' ? '22px' : '16px'};
    }
    svg {
      display: none;
    }
  `}
`

export const SearchBox = ({
  primary = false,
  secondary = false,
  size = '',
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper direction="row" justify="between" size={size}>
      <FormField a11yTitle="Search" htmlFor="search" role="search">
        <Box>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Input id="search" type="search" {...props} />
          <SearchIcon />
        </Box>
      </FormField>
      {size && (
        <Button
          label="Search"
          margin={{ left: '8px' }}
          type="submit"
          primary={primary}
          secondary={secondary}
        />
      )}
    </Wrapper>
  )
}

export default SearchBox
