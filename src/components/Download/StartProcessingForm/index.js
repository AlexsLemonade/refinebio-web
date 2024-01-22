import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { Form } from 'grommet'
import gtag from 'api/analytics/gtag'
import { validationSchemas } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { EmailTextInput } from './EmailTextInput'
import { ReceiveUpdatesCheckBox } from './ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from './TermsOfUseCheckBox'

export const StartProcessingForm = ({ dataset, downloadOptions }) => {
  const { push } = useRouter()
  const { email, startProcessingDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { StartProcessingFormSchema } = validationSchemas

  return (
    <Formik
      initialValues={{
        emailAddress: email || '',
        receiveUpdates: true,
        termsOfUse: false
      }}
      validationSchema={StartProcessingFormSchema}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { emailAddress, receiveUpdates } = values
        const params = {
          data: dataset.data,
          emailAddress,
          receiveUpdates
        }

        if (receiveUpdates) {
          subscribeEmail(emailAddress)
        }

        const response = await startProcessingDataset(params, dataset.id)

        const pathname = `/dataset/${response.id}`
        push({ pathname }, pathname)

        if (downloadOptions.length > 0) {
          gtag.myDatasetDownloadOptions(downloadOptions)
        }

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
        </Form>
      )}
    </Formik>
  )
}

export default StartProcessingForm
