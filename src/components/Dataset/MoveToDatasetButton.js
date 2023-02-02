import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const MoveToDatasetButton = ({ id }) => {
  const { modal, openModal } = useModal()
  const modalId = 'move-to-dataset'

  return (
    <>
      <Button
        label="Move to Dataset"
        secondary
        responsive
        onClick={() => openModal(modalId)}
      />
      {modal.id === id && <Modal>Move to Dataset</Modal>}
    </>
  )
}

export default MoveToDatasetButton
