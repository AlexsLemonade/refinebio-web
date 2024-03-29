import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import { validationSchemas } from 'config'
import { useResponsive } from 'hooks/useResponsive'
import { RequestForm } from 'components/shared/RequestForm'

export const RequestExperimentForm = ({ accessionCode, closeForm }) => {
  const { viewport, setResponsive } = useResponsive()
  const { RequestDataFormSchema } = validationSchemas

  return (
    <Box
      animation={{ type: 'fadeIn', duration: 500 }}
      direction="row"
      justify="between"
    >
      <Formik
        initialValues={{
          accession_codes: accessionCode,
          comments: '',
          pediatric_cancer: '',
          approach: '',
          email: '',
          email_updates: false
        }}
        validationSchema={RequestDataFormSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          // TEMP
          await new Promise((resolve) => {
            setTimeout(() => resolve(values), 1000)
          })
          // eslint-disable-next-line no-console
          console.log(values)
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
              <Heading level={1} margin={{ bottom: 'small' }} responsive>
                Request Experiment '{accessionCode}'
              </Heading>
              <Paragraph margin={{ bottom: 'medium' }}>
                Help us prioritize your request by answering these questions.
              </Paragraph>
              <RequestForm
                closeForm={closeForm}
                errors={errors}
                handleChange={handleChange}
                isSubmitting={isSubmitting}
                touched={touched}
                values={values}
              />
            </Box>
          </Form>
        )}
      </Formik>

      {viewport === 'large' && (
        <Box
          aria-hidden
          background={{
            image: 'url(/illustration-forms.svg)',
            position: 'center',
            repeat: 'no-repeat',
            size: 'contain'
          }}
          margin="large"
          // to preserve the width image
          width="310px"
        />
      )}
    </Box>
  )
}

export default RequestExperimentForm
