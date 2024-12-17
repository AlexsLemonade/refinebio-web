import { useState } from 'react'
import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import gtag from 'analytics/gtag'
import { validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useRefinebio } from 'hooks/useRefinebio'
import { useResponsive } from 'hooks/useResponsive'
import { useTriggerSubmit } from 'hooks/useTriggerSubmit'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { AdvancedOptions } from 'components/Download/DownloadOptionsForm/AdvancedOptions'
import { AggregateOptions } from 'components/Download/DownloadOptionsForm/AggregateOptions'
import { TransformationOptions } from 'components/Download/DownloadOptionsForm/TransformationOptions'
import { EmailTextInput } from 'components/Download/StartProcessingForm/EmailTextInput'
import { ReceiveUpdatesCheckBox } from 'components/Download/StartProcessingForm/ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from 'components/Download/StartProcessingForm/TermsOfUseCheckBox'

export const DownloadNowModal = ({
  experiment,
  hasMultipleOrganisms,
  hasRnaSeq
}) => {
  const { setResponsive } = useResponsive()
  const { email, startProcessingDataset } = useDatasetManager()
  const { acceptedTerms, setAcceptedTerms } = useRefinebio()
  const { StartProcessingFormSchema } = validationSchemas
  const { accession_code: accessionCode } = experiment
  const [downloadOptions, setDownloadOptions] = useState(null)

  const handleStartProcessing = (formValues) => {
    setAcceptedTerms(formValues.termsOfUse)
    setDownloadOptions(formValues)
  }

  const submit = async () => {
    const { emailAddress, receiveUpdates } = downloadOptions

    if (receiveUpdates) {
      const subscribeEmailResponse = await subscribeEmail(emailAddress)
      if (subscribeEmailResponse.status !== 'error') {
        gtag.trackEmailSubscription(DownloadNowModal)
      }
    }

    await startProcessingDataset(downloadOptions, null, accessionCode)
    gtag.trackOneOffExperimentDownload(experiment)
  }

  // trigers dataset processing on form submission
  useTriggerSubmit(downloadOptions, submit)

  return (
    <Box pad={{ bottom: 'small', horizontal: 'large' }}>
      <Box
        border={{ side: 'bottom' }}
        margin={{ bottom: 'medium' }}
        pad={{ bottom: 'small' }}
      >
        <Heading level={1}>Download All Samples Now</Heading>
      </Box>
      <Heading level={5} weight="500" margin={{ bottom: 'medium' }}>
        Download Options:
      </Heading>
      <Formik
        initialValues={{
          aggregate_by: 'EXPERIMENT',
          data: { [accessionCode]: ['ALL'] },
          scale_by: 'NONE',
          quantile_normalize: true,
          emailAddress: email || '',
          receiveUpdates: true,
          termsOfUse: acceptedTerms
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
            {hasMultipleOrganisms && (
              <Box margin={{ bottom: 'medium' }}>
                <AggregateOptions
                  value={values.aggregate_by}
                  handleChange={handleChange}
                  column
                />
              </Box>
            )}
            <Box margin={{ bottom: 'medium' }}>
              <TransformationOptions
                value={values.scale_by}
                handleChange={handleChange}
                column
              />
            </Box>
            {hasRnaSeq && (
              <Box margin={{ bottom: 'medium' }}>
                <AdvancedOptions
                  id={accessionCode}
                  values={values}
                  handleChange={handleChange}
                  toggle
                />
              </Box>
            )}
            <Box margin={{ bottom: 'medium' }}>
              <Paragraph>
                <strong>
                  Putting the download files together takes about 10-20 minutes.
                  Enter your email and we will send you the download link once
                  your files are ready.
                </strong>
              </Paragraph>
              <Box pad={{ top: 'small' }}>
                <EmailTextInput
                  error={errors.emailAddress}
                  touched={touched.emailAddress}
                  value={values.emailAddress}
                  handleChange={handleChange}
                />
                <Box pad={{ top: 'small' }}>
                  {!acceptedTerms && (
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

export default DownloadNowModal
