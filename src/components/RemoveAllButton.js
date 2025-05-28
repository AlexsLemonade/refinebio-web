import { Box, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { Row } from 'components/Row'

export const RemoveAllButton = () => {
  const { loading, clearDataset } = useDatasetManager()
  const { closeModal, openModal } = useModal()
  const { setResponsive } = useResponsive()
  const id = 'remove-all'

  const handleRemoveAll = () => {
    clearDataset()
    closeModal(id)
    gtag.trackDatasetAction(RemoveAllButton)
  }

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
        {/* fixed max-width to preserve UI layout in winder screens */}
        <Box
          width={{ max: setResponsive('none', 'none', '450px') }}
          margin={{ bottom: 'medium' }}
        >
          <Heading level={1}>
            Are you sure you want to remove all samples?
          </Heading>
        </Box>
        <Row gap="small">
          <Button
            label="Yes, remove all samples"
            tertiary
            responsive
            onClick={handleRemoveAll}
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

RemoveAllButton.displayName = 'RemoveAllButton'

export default RemoveAllButton
