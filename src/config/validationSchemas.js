import * as yup from 'yup'

const DownloadEmailForm = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please enter a vaild email')
    .required('Please enter your email address'),
  termsOfService: yup
    .boolean()
    .oneOf(
      [true],
      'Please accept our terms of use to process and download data'
    ),
  receiveUpdates: yup.boolean()
})

export default {
  DownloadEmailForm
}
