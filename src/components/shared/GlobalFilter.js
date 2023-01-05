import { useState, memo } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { useAsyncDebounce } from 'react-table'
import { FormField, Text } from 'grommet'
import { Row } from 'components/shared/Row'
import { TextInput } from 'components/shared/TextInput'

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

  return (
    <Row justify="start" align={setResponsive('start', 'center')}>
      <Text margin={{ right: 'small' }}>Filter</Text>
      <FormField
        htmlFor="global-filter"
        a11yTitle="Global Filter"
        role="search"
      >
        <TextInput
          id="global-filter"
          type="search"
          value={userInput || ''}
          placeholder="Filter table"
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        />
      </FormField>
    </Row>
  )
}

export default memo(GlobalFilter)
