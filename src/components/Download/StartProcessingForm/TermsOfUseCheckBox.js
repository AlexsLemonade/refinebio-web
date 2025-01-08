import { Text } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { CheckBox } from 'components/shared/CheckBox'

export const TermsOfUseCheckBox = ({ error, touched, value, handleChange }) => {
  return (
    <CheckBox
      checked={value}
      error={error && touched}
      errorText={error}
      label={
        <Text>
          I agree to the{' '}
          <Anchor
            href={links.terms_of_use}
            label="Terms of Use"
            rel="noopener noreferrer"
            target="_blank"
          />
        </Text>
      }
      name="termsOfUse"
      onChange={handleChange}
    />
  )
}

export default TermsOfUseCheckBox
