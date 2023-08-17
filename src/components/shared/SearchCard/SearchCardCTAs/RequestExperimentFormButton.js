import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { ModalPage } from 'components/shared/ModalPage'
import { RequestForm } from 'components/shared/RequestForm'

export const RequestExperimentFormButton = ({ accessionCode }) => {
  const { closeModal, openModal } = useModal()
  const id = `request-experiment-form-${accessionCode}`

  return (
    <ModalPage
      id={id}
      button={
        <Button
          label="Request Experiment"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
      <RequestForm
        formTitle={`Request Experiment '${accessionCode}'`}
        illustration="lamp-illustration.svg"
        closeForm={() => closeModal(id)}
      />
    </ModalPage>
  )
}

export default RequestExperimentFormButton
