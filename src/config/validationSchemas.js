import * as yup from 'yup'
import areValidAccessionCodes from 'helpers/areValidAccessionCodes'
import { regex } from './regex'

function matchesAccessionCodes() {
  return this.test({
    name: 'matchesAccessionCodes',
    message: 'Please enter valid accession codes',
    test: (value) => areValidAccessionCodes(value, regex)
  })
}
yup.addMethod(yup.string, 'matchesAccessionCodes', matchesAccessionCodes)

const RequestDataFormSchema = yup.object().shape({
  accession_codes: yup
    .string()
    .matchesAccessionCodes()
    .required('Please list the experiment accession codes here'),
  approach: yup
    .string()
    .required('Which of these most closely describes your primary approach?'),
  email: yup
    .string()
    .email('Please enter a vaild email')
    .required('Please enter your email address'),
  pediatric_cancer: yup
    .string()
    .required('Are you using this for pediatric cancer research?')
})

const StartProcessingFormSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .email('Please enter a vaild email')
    .required('Please enter your email address'),
  termsOfUse: yup
    .boolean()
    .oneOf(
      [true],
      'Please accept our terms of use to process and download data'
    )
})

export default {
  RequestDataFormSchema,
  StartProcessingFormSchema
}
