import { useResponsive } from 'hooks/useResponsive'
import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import styled from 'styled-components'
import { SearchIcon } from '../../images/search.svg'

const Wrapper = styled(Box)`
  > div {
    position: relative;
    &:first-child {
      width: 100%;
    }
  }
  button {
    margin-left: 16px;
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

  ${({ size }) =>
    size &&
    `
    > div:first-child {
      width: calc(100% - 96px);
    }

    button {
      padding:${size === 'xlarge' ? '10px 20px' : '4px 16px'};
    }
    
    input {
      padding: ${size === 'xlarge' ? '22px' : '16px'};
      font-size: ${size === 'xlarge' ? '22px' : '16px'};
    }
  `}

  ${({ responsive, viewport }) =>
    viewport === 'small' &&
    responsive &&
    `
    > div:first-child {
      width: 100%;
    }
    button {
      margin: 16px 0 0 0;
    }
  `}
`

export const SearchBox = ({
  btnWidth = '',
  placeHolder = '',
  primary = false,
  responsive = false,
  secondary = false,
  size = '',
  wrapperWidth = ''
}) => {
  const { viewport } = useResponsive()
  return (
    <Wrapper
      direction={responsive && viewport === 'small' ? 'column' : 'row'}
      justify="between"
      size={size}
      width={wrapperWidth || '100%'}
      viewport={viewport}
      responsive={responsive}
    >
      <FormField a11yTitle="Search" htmlFor="search" role="search">
        <Box>
          <Input id="search" type="search" placeholder={placeHolder} />
          {!size && <SearchIcon />}
        </Box>
      </FormField>
      {size && (
        <Button
          btnWidth={responsive && viewport === 'small' ? '100%' : btnWidth}
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
