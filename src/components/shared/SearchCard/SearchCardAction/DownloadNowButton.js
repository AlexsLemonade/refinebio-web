import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { DownloadNowModal } from './DownloadNowModal'
import { ProcessingDatasetPillModal } from './ProcessingDatasetPillModal'

export const DownloadNowButton = ({
  accessionCode,
  hasMultipleOrganisms,
  hasRnaSeq,
  processingExperiment
}) => {
  const { openModal } = useModal()
  const id = `download-now-${accessionCode}`

  return (
    <Modal
      id={id}
      button={
        <Button
          label="Download Now"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
      width="600px"
    >
      {processingExperiment ? (
        <ProcessingDatasetPillModal
          datasetId={processingExperiment.datasetId}
          id={id}
        />
      ) : (
        <DownloadNowModal
          accessionCode={accessionCode}
          hasMultipleOrganisms={hasMultipleOrganisms}
          hasRnaSeq={hasRnaSeq}
          id={id}
          processingExperiment={processingExperiment}
        />
      )}
    </Modal>
  )
}

export default DownloadNowButton
