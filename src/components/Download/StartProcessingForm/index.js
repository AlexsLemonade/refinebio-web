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
  const { token, applyAcceptedTerms } = useRefinebio()
  const hasToken = !!token
  const { StartProcessingFormSchema } = validationSchemas
  const [downloadOptions, setDownloadOptions] = useState(null)

  const handleStartProcessing = (formValues) => {
    applyAcceptedTerms()
    setDownloadOptions(formValues)
  }

  const submit = async () => {
    const { emailAddress, receiveUpdates } = downloadOptions

    if (receiveUpdates) {
      const subscribeEmailResponse = await subscribeEmail(emailAddress)
      if (subscribeEmailResponse.status !== 'error') {
        gtag.trackEmailSubscription(StartProcessingForm)
      }
    }

    const { id } = await startProcessingDataset(downloadOptions, dataset.id)
    const pathname = `/dataset/${id}`
    push({ pathname }, pathname)
    gtag.trackDatasetDownloadOptions(dataset)
  }

  // makes sure the token is activated before submission
  useEffect(() => {
    if (downloadOptions && token) {
      submit()
    }
  }, [downloadOptions, token])

  return (
    <Formik
      initialValues={{
        data: dataset.data,
        emailAddress: email || '',
        receiveUpdates: true,
        termsOfUse: hasToken
      }}
      validationSchema={StartProcessingFormSchema}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        handleStartProcessing(values)
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
                error={errors.emailAddress}
                touched={touched.emailAddress}
                value={values.emailAddress}
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
            {!hasToken && (
              <TermsOfUseCheckBox
                error={errors.termsOfUse}
                touched={touched.termsOfUse}
                value={values.termsOfUse}
                handleChange={handleChange}
              />
            )}
            <ReceiveUpdatesCheckBox
              value={values.receiveUpdates}
              handleChange={handleChange}
            />
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default StartProcessingForm
