import { useState } from 'react'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useModal } from 'hooks/useModal'
import formatNumbers from 'helpers/formatNumbers'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { MoveToDatasetModal } from './MoveToDatasetModal'

export const MoveToDatasetButton = ({ dataset, newDataset, disabled }) => {
  const { push } = useRouter()
  const { addSamples, getTotalSamples } = useDatasetManager()
  const { openModal, closeModal } = useModal()
  const id = `move-to-dataset-${dataset?.id}`
  const radioOptions = [
    { label: 'Append samples to My Dataset', value: 'append' },
    { label: 'Replace samples in My Dataset', value: 'replace' }
  ]
  const defaultValue = radioOptions[0].value
  const [value, setValue] = useState(defaultValue)
  const newTotalSamples = getTotalSamples(newDataset.data)
  const totalSamples = getTotalSamples(dataset.data)
  const pathname = '/download'

  const handleMoveToDataset = async () => {
    if (totalSamples > 0) {
      openModal(id)
    } else {
      closeModal(id)
      await addSamples(newDataset.data)
      push(
        {
          pathname,
          query: {
            message: `Appended ${formatNumbers(
              newTotalSamples
            )} samples to My Dataset`,
            status: 'success'
          }
        },
        pathname
      )
    }
  }

  return (
    <Modal
      id={id}
      button={
        <Button
          disabled={disabled}
          label="Move to Dataset"
          secondary
          responsive
          onClick={handleMoveToDataset}
        />
      }
      fullHeight={false}
      cleanUp={() => setValue(defaultValue)}
    >
      <MoveToDatasetModal
        id={id}
        dataset={newDataset}
        defaultValue={defaultValue}
        pathname={pathname}
        radioOptions={radioOptions}
        closeModal={closeModal}
        value={value}
        setValue={setValue}
      />
    </Modal>
  )
}

export default MoveToDatasetButton
