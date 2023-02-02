import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const ShareDatasetButton = ({ id = 'share-dataset' }) => {
  const { modal, openModal } = useModal()

  return (
    <>
      <Button
        label="Share Dataset"
        secondary
        responsive
        onClick={() => openModal(id)}
      />
      {modal.id === id && <Modal>Share Dataset</Modal>}
    </>
  )
}

export default ShareDatasetButton
