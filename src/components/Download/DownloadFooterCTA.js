import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { Row } from 'components/shared/Row'

const MoveToDatasetModal = () => (
  <Modal label={<Button label="Move to Dataset" secondary responsive />}>
    Move to Dataset Modal
  </Modal>
)

const ShareDatasetModal = () => (
  <Modal label={<Button label="Share Dataset" secondary responsive />}>
    Share Dataset Modal
  </Modal>
)

export const DownloadFolterCTA = () => {
  const { setResponsive } = useResponsive()

  return (
    <Row>
      <Box>
        <MoveToDatasetModal />
      </Box>
      <Box margin={{ top: setResponsive('medium', 'none') }}>
        <ShareDatasetModal />
      </Box>
    </Row>
  )
}

export default DownloadFolterCTA
