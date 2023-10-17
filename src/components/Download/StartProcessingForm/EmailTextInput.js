import { Box } from 'grommet'
import { InlineMessage } from 'components/shared/InlineMessage'
import { TextInput } from 'components/shared/TextInput'

export const EmailTextInput = ({ error, touched, value, handleChange }) => {
  return (
    <Box style={{ position: 'relative' }}>
      {error && touched && (
        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          <InlineMessage
            color="error"
            height="16px"
            justify="center"
            label={error}
            iconSize="small"
            style={{ position: 'absolute', top: '-20px' }}
          />
        </Box>
      )}
      <TextInput
        error={error}
        name="emailAddress"
        hideIcon
        type="email"
        value={value}
        placeholder="jdoe@example.com"
        onChange={handleChange}
      />
    </Box>
  )
}

export default EmailTextInput
