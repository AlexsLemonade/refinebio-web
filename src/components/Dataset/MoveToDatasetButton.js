import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

const MoveToDatasetModal = () => (
  <Modal label={<Button label="Move to Dataset" secondary responsive />} />
)

// eslint-disable-next-line no-unused-vars
export const MoveToDatasetButton = ({ dataset }) => {
  return <MoveToDatasetModal />
}

export default MoveToDatasetButton
