import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import gtag from 'analytics/gtag'
import { validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/Button'
import { AdvancedOptions } from 'components/Download/DownloadOptionsForm/AdvancedOptions'
import { AggregateOptions } from 'components/Download/DownloadOptionsForm/AggregateOptions'
import { TransformationOptions } from 'components/Download/DownloadOptionsForm/TransformationOptions'
import { EmailTextInput } from 'components/Download/StartProcessingForm/EmailTextInput'
import { ReceiveUpdatesCheckBox } from 'components/Download/StartProcessingForm/ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from 'components/Download/StartProcessingForm/TermsOfUseCheckBox'

export const DownloadDatasetModal = ({ dataset, id, closeModal }) => {
  const { push } = useRouter()
  const { setResponsive } = useResponsive()
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
        gtag.trackEmailSubscription(DownloadDatasetModal)
      }
    }

    const downloadOptions = {
      data: dataset.data,
      ...formValues
    }

    const response = await startProcessingDataset(downloadOptions, dataset.id)
    const pathname = `/dataset/${response.id}`
    push({ pathname }, pathname)
    closeModal(id)
  }

  useEffect(() => {
    if (acceptedTerms && formValues) submit()
  }, [acceptedTerms, formValues])

  return (
    <Box
      margin={{ bottom: 'medium' }}
      pad={{ horizontal: 'large' }}
      width={setResponsive('100%', '100%', '500px')}
    >
      <Heading level={5} weight="500" margin={{ bottom: 'medium' }}>
        Download Options:
      </Heading>
      <Formik
        initialValues={{
          aggregate_by: dataset.aggregate_by,
          scale_by: dataset.scale_by,
          quantile_normalize: dataset.quantile_normalize,
          email_address: email || '',
          email_ccdl_ok: true,
          terms: acceptedTerms
        }}
        validationSchema={StartProcessingFormSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          const { terms, ...rest } = values
          setFormValues(rest)
          setAcceptedTerms(terms)
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
            <Box margin={{ bottom: 'small' }}>
              <AggregateOptions
                value={values.aggregate_by}
                handleChange={handleChange}
                column
              />
            </Box>
            <Box margin={{ bottom: 'xsmall' }}>
              <TransformationOptions
                value={values.scale_by}
                handleChange={handleChange}
                column
              />
            </Box>
            <Box>
              <AdvancedOptions
                id={dataset.id}
                values={values}
                handleChange={handleChange}
                toggle
              />
            </Box>
            <Box margin={{ bottom: 'large' }}>
              <Paragraph>
                <strong>
                  Putting the download files together takes about 10-20 minutes.
                  Enter your email and we will send you the download link once
                  your files are ready.
                </strong>
              </Paragraph>
              <Box pad={{ top: 'small' }}>
                <EmailTextInput
                  error={errors.email_address}
                  touched={touched.email_address}
                  value={values.email_address}
                  handleChange={handleChange}
                />
                <Box pad={{ top: 'small' }}>
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
              </Box>
            </Box>
            <Box align="end">
              <Button
                label="Start Processing"
                isLoading={isSubmitting}
                primary
                responsive
                margin={{
                  bottom: setResponsive('small', 'small', 'none')
                }}
                type="submit"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default DownloadDatasetModal
