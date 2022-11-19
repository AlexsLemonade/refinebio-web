import { useResponsive } from 'hooks/useResponsive'
import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'
import styled from 'styled-components'

const Wrapper = styled(Box)`
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
  const { viewport, setResponsive } = useResponsive()
  return (
    <Wrapper
      direction={responsive && viewport === 'small' ? 'column' : 'row'}
      justify="between"
      size={size}
      width={wrapperWidth || '100%'}
      viewport={viewport}
      responsive={responsive}
    >
      <FormField a11yTitle="Search" htmlFor="search" role="search" width="100%">
        <Box style={{ position: 'relative' }}>
          {!size ? (
            <TextInput
              id="search"
              type="search"
              icon={!size && <Icon name="Search" size="small" />}
              placeholder={placeHolder}
              reverse
            />
          ) : (
            <TextInput id="search" type="search" placeholder={placeHolder} />
          )}
        </Box>
      </FormField>
      {size && (
        <Button
          width={responsive && viewport === 'small' ? '100%' : btnWidth}
          label="Search"
          margin={{
            left: setResponsive('0', 'small'),
            top: viewport === 'small' && responsive ? 'small' : '0'
          }}
          type="submit"
          primary={primary}
          secondary={secondary}
        />
      )}
    </Wrapper>
  )
}

export default SearchBox
