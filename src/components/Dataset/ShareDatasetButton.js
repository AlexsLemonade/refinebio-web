import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

const ShareDatasetModal = () => (
  <Modal label={<Button label="Share Dataset" secondary responsive />} />
)

// eslint-disable-next-line no-unused-vars
export const ShareDatasetButton = ({ dataset }) => {
  return <ShareDatasetModal />
}

export default ShareDatasetButton
