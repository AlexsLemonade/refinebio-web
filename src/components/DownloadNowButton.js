import { useModal } from 'hooks/useModal'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { DownloadNowModal } from 'components/DownloadNowModal'

export const DownloadNowButton = ({
  experiment,
  hasMultipleOrganisms,
  hasRnaSeq
}) => {
  const { accession_code: accessionCode } = experiment
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
      <DownloadNowModal
        experiment={experiment}
        hasMultipleOrganisms={hasMultipleOrganisms}
        hasRnaSeq={hasRnaSeq}
        id={id}
      />
    </Modal>
  )
}

export default DownloadNowButton
