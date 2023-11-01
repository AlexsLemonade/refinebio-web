import { Box, Text } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { CheckBox } from 'components/shared/CheckBox'

export const TermsOfUseCheckBox = ({ error, touched, value, handleChange }) => {
  return (
    <Box margin={{ top: 'small' }}>
      <CheckBox
        checked={value}
        error={error && touched}
        errorText={error}
        label={
          <Text>
            I agree to the{' '}
            <Anchor
              href={links.terms}
              label="Terms of Use"
              rel="noopener noreferrer"
              target="_blank"
            />
          </Text>
        }
        name="termsOfUse"
        onChange={handleChange}
      />
    </Box>
  )
}

export default TermsOfUseCheckBox
