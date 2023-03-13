import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { ModalContent } from './ModalContent'

export const ViewSamplesButton = ({
  dataset,
  params,
  sampleMetadataFields,
  isImmutable
}) => {
  const { openModal } = useModal()
  const id = `view-samples-${params.dataset_id}-${
    params[Object.keys(params)[1]]
  }`

  return (
    <Modal
      id={id}
      button={
        <Button
          label="View Samples"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      modalView
      fullHeight
      height="100vh"
      width="100vw"
    >
      <ModalContent
        dataset={dataset}
        params={params}
        sampleMetadataFields={sampleMetadataFields}
        isImmutable={isImmutable}
      />
    </Modal>
  )
}

export default ViewSamplesButton
