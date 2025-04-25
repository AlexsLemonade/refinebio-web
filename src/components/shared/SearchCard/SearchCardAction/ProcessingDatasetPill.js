import { Box } from 'grommet'
import { useModal } from 'hooks/useModal'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'
import { ProcessingDatasetPillModal } from './ProcessingDatasetPillModal'

// show the processing pill while one-off experiment is being processed
export const ProcessingDatasetPill = ({ datasetId }) => {
  const { openModal } = useModal()
  const id = `procecssing-dataset-${datasetId}`

  return (
    <Modal
      id={id}
      button={
        <Box role="button" onClick={() => openModal(id)}>
          <Pill label="Processing Dataset" status="info" />
        </Box>
      }
      fullHeight={false}
      width="520px"
    >
      <ProcessingDatasetPillModal datasetId={datasetId} id={id} />
    </Modal>
  )
}

export default ProcessingDatasetPill
