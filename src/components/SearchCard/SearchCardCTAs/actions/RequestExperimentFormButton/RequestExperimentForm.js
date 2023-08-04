import { RequestForm } from 'components/shared/RequestForm'

export const RequestExperimentForm = ({ accessionCode, closeForm }) => {
  return (
    <RequestForm
      formTitle={`Request Experiment '${accessionCode}'`}
      illustration="lamp-illustration.svg"
      closeForm={closeForm}
    />
  )
}

export default RequestExperimentForm
