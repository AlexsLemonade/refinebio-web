import { useState } from 'react'
import { Box, Form, Heading, Paragraph, Text } from 'grommet'
import { Formik } from 'formik'
import gtag from 'analytics/gtag'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/Button'
import { Column } from 'components/Column'
import { FixedContainer } from 'components/FixedContainer'
import { Row } from 'components/Row'
import { TextInput } from 'components/TextInput'

export const SignUpBlock = () => {
  const { setResponsive } = useResponsive()
  const [submitted, setSubmitted] = useState(false)

  return (
    <Box
      background="gradientBlueDark"
      pad={{ vertical: setResponsive('medium', 'basex7', 'basex18') }}
    >
      <FixedContainer align="center">
        <Formik
          initialValues={{
            email_address: ''
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await subscribeEmail(values.email_address)

            if (response.status === 'error') {
              setSubmitted(false)
            } else {
              setSubmitted(true)
              gtag.trackEmailSubscription('SignUpBlock')
            }

            setSubmitting(false)
          }}
        >
          {({ handleChange, handleSubmit, isSubmitting, values }) => (
            <Form onSubmit={handleSubmit}>
              <Box align="center">
                {submitted ? (
                  <>
                    <Heading
                      level={1}
                      color="white"
                      margin={{ bottom: 'xsmall' }}
                    >
                      Thanks
                    </Heading>
                    <Paragraph color="white" size="22px">
                      <strong>
                        Thank you for subscribing. Updates will be sent to{' '}
                        <Text color="alex-yellow-base" size="inherit">
                          {values.email_address}
                        </Text>
                      </strong>
                    </Paragraph>
                  </>
                ) : (
                  <>
                    <Heading
                      level={1}
                      color="white"
                      margin={{ bottom: 'medium' }}
                    >
                      Sign Up for Updates
                    </Heading>
                    <Paragraph
                      color="white"
                      margin={{ bottom: 'small' }}
                      textAlign="center"
                      size="large"
                    >
                      Be the first one to know about new features, compendia
                      releases and more!
                    </Paragraph>
                    {/* fixed width to preserve UI layout in wider screens */}
                    <Row width="500px">
                      <Column fill basis="1">
                        <TextInput
                          name="email_address"
                          type="email"
                          value={values.email_address}
                          onChange={handleChange}
                          placeholder="jdoe@example.com"
                        />
                      </Column>
                      <Button
                        label="Sign up"
                        isLoading={isSubmitting}
                        margin={{
                          left: setResponsive('none', 'small'),
                          top: setResponsive('small', 'none')
                        }}
                        primary
                        light
                        responsive
                        type="submit"
                      />
                    </Row>
                  </>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </FixedContainer>
    </Box>
  )
}

export default SignUpBlock
