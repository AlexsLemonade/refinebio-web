import { Box } from 'grommet'
import { useModal } from 'hooks/useModal'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'
import { ProcessingDatasetPillModal } from 'components/shared/ProcessingDatasetPillModal'

// show the processing pill while one-off experiment is being processed
export const ProcessingDatasetPill = ({ accessionCode }) => {
  const { openModal } = useModal()
  const id = `procecssing-dataset-${accessionCode}`

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
      <ProcessingDatasetPillModal accessionCode={accessionCode} id={id} />
    </Modal>
  )
}

export default ProcessingDatasetPill
