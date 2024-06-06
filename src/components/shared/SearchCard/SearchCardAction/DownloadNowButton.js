import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { DownloadNowModal } from './DownloadNowModal'

export const DownloadNowButton = ({
  accessionCode,
  hasMultipleOrganisms,
  hasRnaSeq
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
      <DownloadNowModal
        accessionCode={accessionCode}
        hasMultipleOrganisms={hasMultipleOrganisms}
        hasRnaSeq={hasRnaSeq}
        id={id}
      />
    </Modal>
  )
}

export default DownloadNowButton
