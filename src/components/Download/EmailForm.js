import { Formik } from 'formik'
import { Box, CheckBox, Form, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { TextInput } from 'components/shared/TextInput'
import { links } from 'config'

export const EmailForm = () => {
  const { email } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Formik
      initialValues={{
        email: email || '',
        receiveUpdates: true,
        termsOfService: false
      }}
      onSubmit={async (values, { setSubmitting }) => {
        // TEMP for testing
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(values)
            setSubmitting(false)
          }, 2000)
        })
        console.log(response)
      }}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit}>
          <Row pad={{ top: 'small' }}>
            <Column fill basis="1">
              <TextInput
                name="email"
                type="email"
                value={values.email}
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
          <Box margin={{ top: 'small' }}>
            <CheckBox
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
