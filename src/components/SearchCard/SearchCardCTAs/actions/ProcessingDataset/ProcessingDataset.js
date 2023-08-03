import { Box } from 'grommet'
import { useRefinebio } from 'hooks/useRefinebio'
import { useDataset } from 'hooks/useDataset'
import { useModal } from 'hooks/useModal'
import { Modal } from 'components/shared/Modal'
import { Pill } from 'components/shared/Pill'
import { ModalContent } from './ModalContent'

// Showing Badge while dataset is processing
export const ProcessingDataset = ({ dataset }) => {
  // TEMPORARY
  const { email } = useRefinebio()
  const { datasetId } = useDataset()
  const { closeModal, openModal } = useModal()
  const id = `procecssing-dataset-${dataset?.id || datasetId}`

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
      <ModalContent
        dataset={dataset}
        email={email || 'jone.dow@example.com'}
        closeModal={() => closeModal(id)}
      />
    </Modal>
  )
}

export default ProcessingDataset
