import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { Box, Form } from 'grommet'
import gtag from 'analytics/gtag'
import { validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { EmailTextInput } from './EmailTextInput'
import { ReceiveUpdatesCheckBox } from './ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from './TermsOfUseCheckBox'

export const StartProcessingForm = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { push } = useRouter()
  const { email, startProcessingDataset } = useDatasetManager()
  const { acceptedTerms, setAcceptedTerms } = useRefinebio()
  const { StartProcessingFormSchema } = validationSchemas
  const [formValues, setFormValues] = useState(null)

  const submit = async () => {
    if (formValues.email_ccdl_ok) {
      const subscribeEmailResponse = await subscribeEmail(
        formValues.email_address
      )
      if (subscribeEmailResponse.status !== 'error') {
        gtag.trackEmailSubscription(StartProcessingForm)
      }
    }

    const downloadOptions = {
      data: dataset.data,
      ...formValues
    }

    const { id } = await startProcessingDataset(downloadOptions, dataset.id)
    const pathname = `/dataset/${id}`
    push({ pathname }, pathname)
    gtag.trackDatasetDownloadOptions(dataset)
  }

  useEffect(() => {
    if (formValues) {
      setAcceptedTerms(formValues.terms)
      if (acceptedTerms) submit()
    }
  }, [acceptedTerms, formValues])

  return (
    <Formik
      initialValues={{
        email_address: email || '',
        email_ccdl_ok: true,
        terms: acceptedTerms
      }}
      validationSchema={StartProcessingFormSchema}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { terms, ...rest } = values
        setFormValues(rest)
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
          <Row>
            <Column fill basis="1">
              <EmailTextInput
                error={errors.email_address}
                touched={touched.email_address}
                value={values.email_address}
                handleChange={handleChange}
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
            {!acceptedTerms && (
              <TermsOfUseCheckBox
                error={errors.terms}
                touched={touched.terms}
                value={values.terms}
                handleChange={handleChange}
              />
            )}
            <ReceiveUpdatesCheckBox
              value={values.email_ccdl_ok}
              handleChange={handleChange}
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default StartProcessingForm
