import { useEffect, useState } from 'react'
import { Box, FormField, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Icon } from 'components/shared/Icon'
import { TextInput } from 'components/shared/TextInput'
import { SrOnly } from 'components/shared/SrOnly'

export const LabelTextInput = ({
  value,
  placeholder = '',
  onChange = () => {}
}) => {
  const { setResponsive } = useResponsive()
  const [userInput, setUserInput] = useState(value)

  const handleChange = (newUserInput) => {
    setUserInput(newUserInput)
  }

  const handleClear = () => {
    setUserInput('')
  }

  useEffect(() => {
    onChange(userInput)
  }, [userInput])

  return (
    <Box direction="row" align="center" gap="small">
      <Text>Filter</Text>
      <FormField
        htmlFor="text-input"
        a11yTitle="Text Input Field"
        role="search"
        width={setResponsive('100%', 'auto')}
        style={{ position: 'relative' }}
      >
        <TextInput
          id="text-input"
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
            onClick={handleClear}
          >
            <Icon name="Close" size="16px" />
            <SrOnly>Clear text</SrOnly>
          </Box>
        )}
      </FormField>
    </Box>
  )
}

export default LabelTextInput
