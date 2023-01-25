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

// eslint-disable-next-line no-unused-vars
export const DownloadFolterCTA = ({ dataset }) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      border={{ side: 'bottom' }}
      pad={{ bottom: setResponsive('medium', 'small') }}
    >
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
