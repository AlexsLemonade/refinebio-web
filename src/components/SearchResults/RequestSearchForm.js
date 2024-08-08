import { useRouter } from 'next/router'
import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph, Text } from 'grommet'
import { validationSchemas } from 'config'
import requestData from 'helpers/requestData'
import { useResponsive } from 'hooks/useResponsive'
import { FormField } from 'components/shared/FormField'
import { RequestForm } from 'components/shared/RequestForm'
import { TextInput } from 'components/shared/TextInput'
import { TextNull } from 'components/shared/TextNull'
import { TextRequired } from 'components/shared/TextRequired'

export const RequestSearchForm = ({ onSubmit = () => {} }) => {
  const {
    query: { search: searchTerm },
    push
  } = useRouter()
  const { viewport, setResponsive } = useResponsive()
  const { RequestDataFormSchema } = validationSchemas
  const redirectPathname = '/'
  const responseNotifications = {
    success: {
      message: 'Request for Experiment Received!',
      status: 'success'
    },
    error: {
      message:
        'There was a problem with requesting the experiment. Please try again later.',
      status: 'error'
    }
  }

  return (
    <Box
      animation={{ type: 'fadeIn', duration: 500 }}
      direction="row"
      justify="between"
    >
      <Formik
        initialValues={{
          accession_codes: '',
          comments: '',
          pediatric_cancer: '',
          approach: '',
          email: '',
          email_updates: false,
          query: searchTerm,
          request_type: 'search'
        }}
        validationSchema={RequestDataFormSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await requestData({
            requestValues: {
              ...values
            }
          })
          // redirects to the homepage after submission
          const { message, status } =
            responseNotifications[response.status === 200 ? 'success' : 'error']

          push(
            {
              redirectPathname,
              query: { message, status }
            },
            redirectPathname
          )
          setSubmitting(false)
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
            <Box
              border={{ color: 'brand-tint-80', side: 'bottom', size: '16px' }}
              pad={{ horizontal: 'large', vertical: 'xlarge' }}
              width={setResponsive('100%', '100%', '800px')} // to preserve the UI for the desktop view
              style={{ boxShadow: ' 0px 3px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <Heading level={1} margin={{ bottom: 'medium' }} responsive>
                Tell us what’s missing
              </Heading>
              <FormField>
                <Paragraph>
                  List experiment accessions (separated by commas) you expect
                  for search term ‘<strong>{searchTerm}</strong>’{' '}
                  <TextRequired />
                </Paragraph>
                <Text margin={{ top: 'small' }}>
                  <i>
                    Only accessions from GEO, SRA, and ArrayExpress are
                    accepted.
                  </i>
                </Text>
                <TextInput
                  error={errors.accession_codes}
                  errorText={errors.accession_codes}
                  labelOnly
                  name="accession_codes"
                  positionTop="-40px"
                  touched={touched.accession_codes}
                  values={values.accession_codes}
                  width={{ max: '520px' }}
                  onChange={handleChange}
                />
                <TextNull text="Example: GSE3303, E-MEXP-3405, SRP2422" />
              </FormField>
              <Heading
                level={2}
                margin={{ bottom: 'xsmall' }}
                size="small"
                responsive
              >
                Help us priortize your request by answering these questions
              </Heading>
              <RequestForm
                errors={errors}
                handleChange={handleChange}
                isSubmitting={isSubmitting}
                touched={touched}
                values={values}
                onSubmit={onSubmit}
              />
            </Box>
          </Form>
        )}
      </Formik>

      {viewport === 'large' && (
        <Box
          aria-hidden
          background={{
            image: 'url(/illustration-lamp.svg)',
            position: 'center',
            repeat: 'no-repeat',
            size: 'contain'
          }}
          margin={{ right: 'large' }}
          // to preserve the width image
          width="250px"
        />
      )}
    </Box>
  )
}

export default RequestSearchForm
