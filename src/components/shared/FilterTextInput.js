import { useState } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { useAsyncDebounce } from 'react-table'
import { Box, FormField, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'
import { SrOnly } from 'components/shared/SrOnly'

export const FilterTextInput = ({ filter, setFilter, placeholder = '' }) => {
  const { setResponsive } = useResponsive()
  const [userInput, setUserInput] = useState(filter)

  const debounceInput = useAsyncDebounce((value) => {
    setFilter(value || '')
  }, 500)

  const handleChange = (value) => {
    setUserInput(value)
    debounceInput(value)
  }

  const clearInput = () => {
    setUserInput('')
    setFilter('')
  }

  return (
    <>
      <Text
        margin={{ right: 'small', bottom: setResponsive('xsmall', 'none') }}
      >
        Filter
      </Text>
      <FormField
        htmlFor="filter-text-input"
        a11yTitle="Filter Text Input Field"
        role="search"
        width={setResponsive('100%', 'auto')}
        style={{ position: 'relative' }}
      >
        <TextInput
          id="filter-text-input"
          type="text"
          value={userInput || ''}
          placeholder={placeholder}
          style={{ paddingRight: '28px' }}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        />
        {userInput && (
          <Box
            role="button"
            style={{
              boxShadow: 'none',
              position: 'absolute',
              right: '8px',
              top: '8px'
            }}
            onClick={clearInput}
          >
            <Icon name="Close" size="16px" />
            <SrOnly>Clear text</SrOnly>
          </Box>
        )}
      </FormField>
    </>
  )
}

export default FilterTextInput
