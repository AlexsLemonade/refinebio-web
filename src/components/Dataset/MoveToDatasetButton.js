import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const MoveToDatasetButton = ({ id = 'move-to-dataset' }) => {
  const { modal, openModal } = useModal()

  return (
    <>
      <Button
        label="Move to Dataset"
        secondary
        responsive
        onClick={() => openModal(id)}
      />
      {modal.id === id && <Modal>Move to Dataset</Modal>}
    </>
  )
}

export default MoveToDatasetButton
