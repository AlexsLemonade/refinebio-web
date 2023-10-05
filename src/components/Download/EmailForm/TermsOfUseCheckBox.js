import { Box, CheckBox, Text } from 'grommet'
import { links } from 'config'
import { Anchor } from 'components/shared/Anchor'
import { InlineMessage } from 'components/shared/InlineMessage'

export const TermsOfUseCheckBox = ({ error, touched, value, handleChange }) => {
  return (
    <Box pad={{ top: 'medium' }} style={{ position: 'relative' }}>
      {error && touched && (
        <Box animation={{ type: 'fadeIn', duration: 300 }}>
          <InlineMessage
            color="error"
            height="16px"
            justify="center"
            label={error}
            iconSize="small"
            style={{ position: 'absolute', top: '10px' }}
          />
        </Box>
      )}
      <CheckBox
        checked={value}
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
