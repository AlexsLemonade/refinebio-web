import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import gtag from 'api/analytics/gtag'
import { options, validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { AdvancedOptions } from 'components/Download/DownloadOptionsForm/AdvancedOptions'
import { AggregateOptions } from 'components/Download/DownloadOptionsForm/AggregateOptions'
import { TransformationOptions } from 'components/Download/DownloadOptionsForm/TransformationOptions'
import { EmailTextInput } from 'components/Download/StartProcessingForm/EmailTextInput'
import { ReceiveUpdatesCheckBox } from 'components/Download/StartProcessingForm/ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from 'components/Download/StartProcessingForm/TermsOfUseCheckBox'
import { ProcessingDatasetPillModal } from './ProcessingDatasetPillModal'

export const DownloadNowModal = ({
  accessionCode,
  hasMultipleOrganisms,
  hasRnaSeq,
  id
}) => {
  const { email, startProcessingDataset } = useDatasetManager()
  const { addProcessingResource, getProcessingResource } =
    usePollDatasetStatus(accessionCode)
  const { setResponsive } = useResponsive()
  const processingExperiment = getProcessingResource(accessionCode)
  const { StartProcessingFormSchema } = validationSchemas

  if (processingExperiment) {
    return (
      <ProcessingDatasetPillModal
        datasetId={processingExperiment.datasetId}
        id={id}
      />
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
            const subscribeEmailResponse = await subscribeEmail(emailAddress)
            if (subscribeEmailResponse.status !== 'error') {
              gtag.emailSubscription(DownloadNowModal.name)
            }
          }

          const response = await startProcessingDataset(values)
          addProcessingResource(response.id, accessionCode)
          gtag.oneOffExperimentDownload(accessionCode)
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
