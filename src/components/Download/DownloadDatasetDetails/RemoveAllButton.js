import { Box, Heading } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Row } from 'components/shared/Row'

export const RemoveAllButton = () => {
  const { loading, emptyDataset } = useDatasetManager()
  const { closeModal, openModal } = useModal()
  const { setResponsive } = useResponsive()
  const id = 'remove-all'

  return (
    <Modal
      id={id}
      button={
        <Button
          isLoading={loading}
          label="Remove All"
          tertiary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
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
            onClick={() => {
              // TEMPORARY for demo
              emptyDataset()
              closeModal(id)
            }}
          />
          <Button
            label="No, keep all samples"
            secondary
            responsive
            onClick={() => closeModal(id)}
          />
        </Row>
      </Box>
    </Modal>
  )
}

export default RemoveAllButton
