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
  const { push } = useRouter()
  const { acceptedTerms } = useRefinebio()
  const { email, startProcessingDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { StartProcessingFormSchema } = validationSchemas

  return (
    <Formik
      initialValues={{
        emailAddress: email || '',
        receiveUpdates: true,
        termsOfUse: acceptedTerms
      }}
      validationSchema={StartProcessingFormSchema}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { emailAddress, receiveUpdates } = values
        const downloadOptions = {
          data: dataset.data,
          emailAddress,
          receiveUpdates
        }

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
        </Form>
      )}
    </Formik>
  )
}

export default StartProcessingForm
