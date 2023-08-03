import { useState } from 'react'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { ModalContent } from './ModalContent'

export const MoveToDatasetButton = ({ dataset }) => {
  const { openModal, closeModal } = useModal()
  const id = `move-to-dataset-${dataset?.id}`
  const radioOptions = [
    { label: 'Append samples to My Dataset', value: 'append' },
    { label: 'Replace samples in My Dataset', value: 'replace' }
  ]
  const defaultValue = radioOptions[0].value
  const [value, setValue] = useState(defaultValue)

  return (
    <Modal
      id={id}
      button={
        <Button
          label="Move to Dataset"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
      cleanUp={() => setValue(defaultValue)}
    >
      <ModalContent
        id={id}
        dataset={dataset}
        defaultValue={defaultValue}
        radioOptions={radioOptions}
        closeModal={closeModal}
        value={value}
        setValue={setValue}
      />
    </Modal>
  )
}

export default MoveToDatasetButton
