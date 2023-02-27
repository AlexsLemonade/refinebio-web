import { useState, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { useAsyncDebounce } from 'react-table'
import { Box, FormField, Text } from 'grommet'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'
import { SrOnly } from 'components/shared/SrOnly'

export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const { setResponsive } = useResponsive()
  const [userInput, setUserInput] = useState(globalFilter)

  const debounceInput = useAsyncDebounce((value) => {
    setGlobalFilter(value || '')
  }, 500)

  const handleChange = (value) => {
    setUserInput(value)
    debounceInput(value)
  }

  const clearInput = () => {
    setUserInput('')
    setGlobalFilter('')
  }

  return (
    <Box
      direction="row"
      justify="start"
      align={setResponsive('start', 'center')}
    >
      <Text
        margin={{ right: 'small', bottom: setResponsive('xsmall', 'none') }}
      >
        Filter
      </Text>
      <FormField
        htmlFor="global-filter"
        a11yTitle="Global Filter"
        role="search"
        width={setResponsive('100%', 'auto')}
        style={{ position: 'relative' }}
      >
        <TextInput
          id="global-filter"
          type="text"
          value={userInput || ''}
          placeholder="Filter table"
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
    </Box>
  )
}

export default memo(GlobalFilter)
