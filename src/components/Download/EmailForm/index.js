import { useRouter } from 'next/navigation'
import { Formik } from 'formik'
import { Form } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import subscribeEmail from 'helpers/subscribeEmail'
import { validationSchemas } from 'config'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Row } from 'components/shared/Row'
import { EmailField } from './EmailField'
import { ReceiveUpdatesCheckBox } from './ReceiveUpdatesCheckBox'
import { TermsOfUseCheckBox } from './TermsOfUseCheckBox'

export const EmailForm = ({ dataset }) => {
  const { push } = useRouter()
  const { email, startProcessingDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const { DownloadEmailForm } = validationSchemas

  return (
    <Formik
      initialValues={{
        emailAddress: email || '',
        receiveUpdates: true,
        termsOfUse: false
      }}
      validationSchema={DownloadEmailForm}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting }) => {
        const { emailAddress, receiveUpdates } = values
        const downloadOptions = {
          data: dataset.data,
          emailAddress,
          receiveUpdates
        }

        if (receiveUpdates) {
          subscribeEmail(emailAddress)
        }

        const response = await startProcessingDataset(
          dataset.id,
          downloadOptions
        )

        const pathname = `/dataset/${response.id}`
        push({ pathname }, pathname)
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
              <EmailField
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

export default EmailForm
