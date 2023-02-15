import { useModal } from 'hooks/useModal'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const RemoveAllButton = ({ id = 'remove-all' }) => {
  const { modal, openModal } = useModal()

  return (
    <>
      <Button
        label="Remove All"
        tertiary
        responsive
        onClick={() => openModal(id)}
      />
      {modal.id === id && (
        <Modal>
          <Box>Remove All Modal</Box>
        </Modal>
      )}
    </>
  )
}

export default RemoveAllButton
