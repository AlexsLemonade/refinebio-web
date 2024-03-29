import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { DownloadDatasetModal } from './DownloadDatasetModal'

export const DownloadDatasetButton = ({
  dataset,
  label = 'Download Dataset'
}) => {
  const { openModal, closeModal } = useModal()
  const id = `download-dataset_${dataset.id}`

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
