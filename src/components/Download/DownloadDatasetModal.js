import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { Box, Form, Heading, Paragraph } from 'grommet'
import { validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { AdvancedOptions } from 'components/Download/DownloadOptionsForm/AdvancedOptions'
import { AggregateOptions } from 'components/Download/DownloadOptionsForm/AggregateOptions'
import { TransformationOptions } from 'components/Download/DownloadOptionsForm/TransformationOptions'
import { EmailTextInput } from 'components/Download/StartProcessingForm/EmailTextInput'
import { ReceiveUpdatesCheckBox } from 'components/Download/StartProcessingForm/ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from 'components/Download/StartProcessingForm/TermsOfUseCheckBox'

export const DownloadDatasetModal = ({ dataset, id, closeModal }) => {
  const { push } = useRouter()
  const { email, startProcessingDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { StartProcessingFormSchema } = validationSchemas

  const handleUpdateDownloadOptions = (onChange) => (name, newValue) =>
    onChange({
      target: {
        name,
        value: newValue
      }
    })

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
          data: dataset.data,
          scale_by: dataset.scale_by,
          quantile_normalize: dataset.quantile_normalize,
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

          const response = await startProcessingDataset(dataset.id, values)
          const pathname = `/dataset/${response.id}`
          push({ pathname }, pathname)
          closeModal(id)
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
                handleChange={handleUpdateDownloadOptions(handleChange)}
                column
              />
            </Box>
            <Box margin={{ bottom: 'xsmall' }}>
              <TransformationOptions
                value={values.scale_by}
                handleChange={handleUpdateDownloadOptions(handleChange)}
                column
              />
            </Box>
            <Box>
              <AdvancedOptions
                id={dataset.id}
                values={values}
                handleChange={handleUpdateDownloadOptions(handleChange)}
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

export default DownloadDatasetModal
