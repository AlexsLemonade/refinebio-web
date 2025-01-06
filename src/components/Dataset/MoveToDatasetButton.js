import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useModal } from 'hooks/useModal'
import formatNumbers from 'helpers/formatNumbers'
import { Button as SharedButton } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { MoveToDatasetModal } from './MoveToDatasetModal'

const Button = ({ onClick }) => (
  <SharedButton
    label="Move to Dataset"
    secondary
    responsive
    onClick={onClick}
  />
)

export const MoveToDatasetButton = ({ dataset }) => {
  const { push } = useRouter()
  const { openModal, closeModal } = useModal()
  const modalId = `move-to-dataset-${dataset.id}`
  const {
    dataset: myDataset,
    addSamples,
    getTotalSamples,
    replaceSamples
  } = useDatasetManager()
  const myDatasetTotalSamples = getTotalSamples(myDataset?.data)

  const handleRedirect = (prefix) => {
    push({
      pathname: '/download',
      query: {
        message: `${prefix} ${formatNumbers(
          getTotalSamples(dataset.data) // display the shared dataset total samples
        )} samples to My Dataset`,
        status: 'success'
      }
    })
  }

  const handleAppend = async () => {
    await addSamples(dataset.data)
    handleRedirect('Appended')
  }

  const handleReplace = async () => {
    await replaceSamples(dataset.data)
    handleRedirect('Moved')
  }

  // if no samples in myDataset, add shared samples on click without opening modal
  if (myDatasetTotalSamples === 0) {
    return <Button onClick={handleAppend} />
  }

  return (
    <Modal
      id={modalId}
      button={<Button onClick={() => openModal(modalId)} />}
      fullHeight={false}
    >
      <MoveToDatasetModal
        onAppend={handleAppend}
        onReplace={handleReplace}
        onCloseModal={() => closeModal(modalId)}
      />
    </Modal>
  )
}

export default MoveToDatasetButton
