import { useState } from 'react'
import { useRouter } from 'next/router'
import gtag from 'analytics/gtag'
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
  const defaultAction = 'append'
  const [action, setAction] = useState(defaultAction)

  const downloadRedirectWithPrefix = (prefix) => {
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

  const handlers = {
    append: async () => {
      await addSamples(dataset.data)
      downloadRedirectWithPrefix('Appended')
    },
    replace: async () => {
      await replaceSamples(dataset.data)
      downloadRedirectWithPrefix('Moved')
    }
  }

  const handleReset = () => {
    setAction(defaultAction)
    closeModal(modalId)
  }

  const handleSubmit = async () => {
    await handlers[action]()
    gtag.trackDatasetAction(MoveToDatasetModal)
    handleReset()
  }

  // if no samples in myDataset, add shared samples on click without opening modal
  if (myDatasetTotalSamples === 0) {
    return <Button onClick={handleSubmit} />
  }

  return (
    <Modal
      id={modalId}
      button={<Button onClick={() => openModal(modalId)} />}
      fullHeight={false}
    >
      <MoveToDatasetModal
        value={action}
        onChange={setAction}
        onReset={handleReset}
        onSubmit={handleSubmit}
      />
    </Modal>
  )
}

export default MoveToDatasetButton
