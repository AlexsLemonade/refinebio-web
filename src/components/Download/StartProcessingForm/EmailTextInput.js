import { TextInput } from 'components/TextInput'

export const EmailTextInput = ({ error, touched, value, handleChange }) => {
  return (
    <TextInput
      error={error && touched}
      errorText={error}
      name="email_address"
      type="email"
      value={value}
      placeholder="jdoe@example.com"
      onChange={handleChange}
    />
  )
}

export default EmailTextInput
