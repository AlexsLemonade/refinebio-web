import { useModal } from 'hooks/useModal'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const ViewSamplesButton = ({ id, sampleMetadataFields }) => {
  const { openModal } = useModal()

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
    >
      {sampleMetadataFields.map((x) => (
        <Box key={x}>{x}</Box>
      ))}
    </Modal>
  )
}

export default ViewSamplesButton
