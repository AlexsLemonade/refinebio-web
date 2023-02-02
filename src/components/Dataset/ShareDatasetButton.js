import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

// eslint-disable-next-line no-unused-vars
export const ShareDatasetButton = ({ id }) => {
  const { modal, openModal } = useModal()
  const modalId = 'share-dataset'

  return (
    <>
      <Button
        label="Share Dataset"
        secondary
        responsive
        onClick={() => openModal(modalId)}
      />
      {modal.id === id && <Modal>Share Dataset</Modal>}
    </>
  )
}

export default ShareDatasetButton
