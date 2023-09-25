import { Formik } from 'formik'
import { Box, CheckBox, Form, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { InlineMessage } from 'components/shared/InlineMessage'
import { TextInput } from 'components/shared/TextInput'
import { validationSchemas, links } from 'config'

export const EmailForm = () => {
  const { email, token } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { DownloadEmailForm } = validationSchemas

  return (
    <Formik
      initialValues={{
        emailAddress: email || '',
        receiveUpdates: true,
        termsOfService: Boolean(token)
      }}
      validationSchema={DownloadEmailForm}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        // TEMP for testing
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
            setSubmitting(false)
          }, 2000)
        })
        console.log(values)
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Column fill basis="1" style={{ position: 'relative' }}>
              {errors.emailAddress && touched.emailAddress && (
                <Box animation={{ type: 'fadeIn', duration: 300 }}>
                  <InlineMessage
                    color="error"
                    height="16px"
                    justify="center"
                    label={errors.emailAddress}
                    iconSize="small"
                    style={{ position: 'absolute', top: '-20px' }}
                  />
                </Box>
              )}
              <TextInput
                error={errors.emailAddress}
                name="emailAddress"
                hideIcon
                type="email"
                value={values.emailAddress}
                placeholder="jdoe@example.com"
                onChange={handleChange}
              />
            </Column>
            <Button
              label="Start Processing"
              isLoading={isSubmitting}
              margin={{
                left: setResponsive('none', 'small'),
                top: setResponsive('small', 'none')
              }}
              primary
              responsive
              type="submit"
            />
          </Row>
          <Box pad={{ top: 'medium' }} style={{ position: 'relative' }}>
            {errors.termsOfService && touched.termsOfService && (
              <Box animation={{ type: 'fadeIn', duration: 300 }}>
                <InlineMessage
                  color="error"
                  height="16px"
                  justify="center"
                  label={errors.termsOfService}
                  iconSize="small"
                  style={{ position: 'absolute', top: '10px' }}
                />
              </Box>
            )}
            <CheckBox
              checked={values.termsOfService}
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
              name="termsOfService"
              onChange={handleChange}
            />
            <CheckBox
              checked={values.receiveUpdates}
              label="I would like to receive occasional updates from the refine.bio team"
              name="receiveUpdates"
              onChange={handleChange}
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default EmailForm
