import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { ViewSamplesModal } from './ViewSamplesModal'

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
      height="98.8vh"
      width="99.2vw"
    >
      <ViewSamplesModal
        dataset={dataset}
        params={params}
        sampleMetadataFields={sampleMetadataFields}
        isImmutable={isImmutable}
      />
    </Modal>
  )
}

export default ViewSamplesButton
