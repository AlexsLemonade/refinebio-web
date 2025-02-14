import { useEffect, useState } from 'react'
import { Box, Form } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { Icon } from 'components/Icon'
import { SrOnly } from 'components/SrOnly'
import { TextInput } from 'components/TextInput'

export const SearchBox = ({
  btnType = 'primary',
  btnWidth = '',
  padding,
  placeholder = '',
  responsive = false,
  reverse = true,
  size = 'medium',
  value = '',
  onChange = () => {},
  onSubmit = () => {}
}) => {
  const { viewport, setResponsive } = useResponsive()
  const [input, setInput] = useState(value)

  const handleChange = (newVal) => {
    onChange(newVal)
    setInput(newVal)
  }

  const handleClear = () => {
    setInput('')
  }

  useEffect(() => {
    setInput(value)
  }, [value])

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
        onSubmit={() => onSubmit(input)}
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
                value={input}
                onChange={(e) => handleChange(e.target.value)}
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
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
            )}
            {input && size === 'large' && (
              <Box
                role="button"
                style={{
                  boxShadow: 'none',
                  position: 'absolute',
                  right: setResponsive('16px', '16px'),
                  top: '16px'
                }}
                onClick={handleClear}
              >
                <Icon name="Close" size="16px" />
                <SrOnly>Clear text</SrOnly>
              </Box>
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
