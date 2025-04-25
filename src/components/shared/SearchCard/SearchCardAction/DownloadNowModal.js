import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import { options, validationSchemas } from 'config'
import { useOneOffExperiment } from 'hooks/useOneOffExperiment'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { TransformationOptions } from 'components/Download/DownloadOptionsForm/TransformationOptions'
import { EmailTextInput } from 'components/Download/StartProcessingForm/EmailTextInput'
import { ReceiveUpdatesCheckBox } from 'components/Download/StartProcessingForm/ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from 'components/Download/StartProcessingForm/TermsOfUseCheckBox'
import { ProcessingDatasetPillModal } from './ProcessingDatasetPillModal'

export const DownloadNowModal = ({ accessionCode, id }) => {
  const { addProcessingExperiment, getProcessingExperiment } =
    useOneOffExperiment()
  const { email, startProcessingDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { StartProcessingFormSchema } = validationSchemas
  const experiment = getProcessingExperiment(accessionCode)

  if (experiment) {
    return (
      <ProcessingDatasetPillModal datasetId={experiment.datasetId} id={id} />
    )
  }

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
          aggregate_by: options.aggregation[0].value,
          data: { [accessionCode]: ['ALL'] },
          scale_by: options.transformation[0].value,
          quantile_normalize: true,
          emailAddress: email || '',
          receiveUpdates: true,
          termsOfUse: false
        }}
        validationSchema={StartProcessingFormSchema}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          const { emailAddress, receiveUpdates } = values
          if (receiveUpdates) {
            subscribeEmail(emailAddress)
          }

          const response = await startProcessingDataset(null, values)
          addProcessingExperiment(accessionCode, response.id)
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
            <Box margin={{ bottom: 'large' }}>
              <TransformationOptions
                value={values.scale_by}
                handleChange={handleChange}
                column
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
                  error={errors.emailAddress}
                  touched={touched.emailAddress}
                  value={values.emailAddress}
                  handleChange={handleChange}
                />
                <TermsOfUseCheckBox
                  error={errors.termsOfUse}
                  touched={touched.termsOfUse}
                  value={values.termsOfUse}
                  handleChange={handleChange}
                />
                <ReceiveUpdatesCheckBox
                  value={values.receiveUpdates}
                  handleChange={handleChange}
                />
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
