import { useModal } from 'hooks/useModal'
import { useRefinebio } from 'hooks/useRefinebio'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { ModalPage } from 'components/shared/ModalPage'
import { RequestExperimentForm } from './RequestExperimentForm'

export const RequestExperimentFormButton = ({ accessionCode }) => {
  const { requestedExperiments, setRequestedExperiments } = useRefinebio()
  const { closeModal, openModal } = useModal()
  const id = `request-experiment-form-${accessionCode}`

  const addRequestedExperiment = () => {
    setRequestedExperiments([...requestedExperiments, accessionCode])
  }

  if (requestedExperiments.includes(accessionCode)) {
    return (
      <InlineMessage
        type="success"
        label="Experiment requested"
        iconSize="small"
        height="14px"
      />
    )
  }

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
      <RequestExperimentForm
        accessionCode={accessionCode}
        addRequestedExperiment={addRequestedExperiment}
        closeForm={() => closeModal(id)}
      />
    </ModalPage>
  )
}

export default RequestExperimentFormButton
