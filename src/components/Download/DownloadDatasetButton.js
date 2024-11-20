import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { DownloadDatasetModal } from './DownloadDatasetModal'

export const DownloadDatasetButton = ({
  dataset,
  label = 'Download Dataset'
}) => {
  const {
    is_processing: isProcessing,
    is_processed: isProcessed,
    success
  } = dataset
  const { openModal, closeModal } = useModal()
  const id = `download-dataset_${dataset.id}`
  const isUnprocessedDataset = // sets visibility of the Download Dataset button
    !isProcessing && !isProcessed && success !== false

  if (!isUnprocessedDataset) return null

  return (
    <Modal
      id={id}
      button={
        <Button
          label={label}
          primary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
      <DownloadDatasetModal dataset={dataset} id={id} closeModal={closeModal} />
    </Modal>
  )
}

export default DownloadDatasetButton
