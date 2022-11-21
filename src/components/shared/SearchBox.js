import { useResponsive } from 'hooks/useResponsive'
import { Box, FormField } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'

export const SearchBox = ({
  btnType = 'primary',
  btnWidth = '',
  placeHolder = '',
  responsive = false,
  size = 'medium'
}) => {
  const { viewport, setResponsive } = useResponsive()
  return (
    <Box
      direction={responsive && viewport === 'small' ? 'column' : 'row'}
      justify="between"
      responsive={responsive}
      size={size}
      viewport={viewport}
      width="100%"
    >
      <FormField
        a11yTitle="Search"
        htmlFor="search"
        role="search"
        width={
          size !== 'small' && viewport !== 'small'
            ? 'calc(100% - 96px)'
            : '100%'
        }
      >
        <Box style={{ position: 'relative' }}>
          {size === 'small' ? (
            <TextInput
              id="search"
              icon={<Icon name="Search" size="small" />}
              placeholder={placeHolder}
              type="search"
              reverse
            />
          ) : (
            <TextInput
              id="search"
              placeholder={placeHolder}
              type="search"
              style={{
                fontSize: size === 'large' ? '22px' : '16px',
                padding: size === 'large' ? '22px' : '16px'
              }}
            />
          )}
        </Box>
      </FormField>
      {size !== 'small' && (
        <Button
          label="Search"
          margin={{
            left: setResponsive('0', 'small'),
            top: viewport === 'small' && responsive ? 'small' : '0'
          }}
          primary={btnType === 'primary'}
          secondary={btnType === 'secondary'}
          style={{ padding: size === 'large' ? '10px 20px' : '4px 16px' }}
          type="submit"
          width={responsive && viewport === 'small' ? '100%' : btnWidth}
        />
      )}
    </Box>
  )
}

export default SearchBox
