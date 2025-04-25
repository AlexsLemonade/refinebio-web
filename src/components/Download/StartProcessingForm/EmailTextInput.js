import { TextInput } from 'components/shared/TextInput'

export const EmailTextInput = ({ error, touched, value, handleChange }) => {
  return (
    <TextInput
      error={error && touched}
      errorText={error}
      name="emailAddress"
      type="email"
      value={value}
      placeholder="jdoe@example.com"
      onChange={handleChange}
    />
  )
}

export default EmailTextInput
