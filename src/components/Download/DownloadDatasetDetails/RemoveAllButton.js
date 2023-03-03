import { useDataset } from 'hooks/useDataset'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Row } from 'components/shared/Row'

export const RemoveAllButton = ({ id = 'remove-all' }) => {
  const { removeAllDataset } = useDataset()
  const { modal, closeModal, openModal } = useModal()
  const { setResponsive } = useResponsive()

  return (
    <>
      <Button
        label="Remove All"
        tertiary
        responsive
        onClick={() => openModal(id)}
      />
      {modal.id === id && (
        <Modal fullHeight={false}>
          <Box pad={{ bottom: 'small', horizontal: 'large' }}>
            <Box
              width={{ max: setResponsive('none', 'none', '450px') }}
              margin={{ bottom: 'medium' }}
            >
              {/* fixed max-width to preserve UI layout in winder screens */}
              <Heading level={1}>
                Are you sure you want to remove all samples?
              </Heading>
            </Box>
            <Row gap="small">
              <Button
                label="Yes, remove all samples"
                tertiary
                responsive
                onClick={removeAllDataset}
              />
              <Button
                label="No, keep all samples"
                secondary
                responsive
                onClick={closeModal}
              />
            </Row>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default RemoveAllButton
