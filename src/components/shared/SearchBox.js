import { useResponsive } from 'hooks/useResponsive'
import { Box, Form } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'

export const SearchBox = ({
  btnType = 'primary',
  btnWidth = '',
  padding,
  placeholder = '',
  responsive = false,
  reverse = true,
  size = 'medium',
  value = '',
  blurHandler,
  changeHandler,
  focusHandler,
  submitHandler
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
      <Form
        htmlFor="search"
        role="search"
        style={{ width: '100%' }}
        onSubmit={submitHandler}
      >
        <Box
          direction={responsive && viewport === 'small' ? 'column' : 'row'}
          width="100%"
        >
          <Box
            style={{ position: 'relative' }}
            width={
              size !== 'small' && viewport !== 'small'
                ? 'calc(100% - 96px)'
                : '100%'
            }
          >
            {size === 'small' ? (
              <TextInput
                id="search"
                icon={<Icon name="Search" size="small" />}
                placeholder={placeholder}
                style={{ padding }}
                type="search"
                reverse={reverse}
                value={value}
                onBlur={blurHandler}
                onChange={changeHandler}
                onFocus={focusHandler}
              />
            ) : (
              <TextInput
                id="search"
                placeholder={placeholder}
                type="search"
                style={{
                  fontSize: size === 'large' ? '22px' : '16px',
                  padding: size === 'large' ? '22px' : '16px'
                }}
                value={value}
                onBlur={blurHandler}
                onChange={changeHandler}
                onFocus={focusHandler}
              />
            )}
          </Box>
          {size !== 'small' && (
            <Button
              label="Search"
              margin={{
                left: setResponsive('none', 'small'),
                top: viewport === 'small' && responsive ? 'small' : 'none'
              }}
              primary={btnType === 'primary'}
              secondary={btnType === 'secondary'}
              style={{ padding: size === 'large' ? '10px 20px' : '4px 16px' }}
              type="submit"
              width={responsive && viewport === 'small' ? '100%' : btnWidth}
            />
          )}
        </Box>
      </Form>
    </Box>
  )
}

export default SearchBox
