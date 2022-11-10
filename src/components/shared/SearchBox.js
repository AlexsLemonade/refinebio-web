import { useResponsive } from 'hooks/useResponsive'
import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Input } from 'components/shared/Input'
import styled, { css } from 'styled-components'
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

  ${({ width }) => css`
    width: ${width || '100%'};
  `}

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

  ${({ size, viewport }) =>
    viewport === 'small' &&
    size === 'xlarge' &&
    `
    flex-direction: column;
    
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
  secondary = false,
  size = '',
  width = ''
}) => {
  const { viewport } = useResponsive()
  return (
    <Wrapper
      direction="row"
      justify="between"
      size={size}
      width={width}
      viewport={viewport}
    >
      <FormField a11yTitle="Search" htmlFor="search" role="search">
        <Box>
          <Input id="search" type="search" placeholder={placeHolder} />
          {!size && <SearchIcon />}
        </Box>
      </FormField>
      {size && (
        <Button
          btnWidth={btnWidth}
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
