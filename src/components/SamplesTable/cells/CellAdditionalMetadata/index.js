import { memo } from 'react'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { TextNull } from 'components/shared/TextNull'
import { ModalContent } from './ModalContent'

export const CellAdditionalMetadata = ({ row: { original: sample } }) => {
  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  const id = `metadata_${sample.id}`
  const { modal, openModal } = useModal()
  const annotations = sample.annotations.map((annotation) => annotation.data)

  return (
    <>
      <Button label="View" link onClick={() => openModal(id)} />
      {modal.id === id && <ModalContent annotations={annotations} />}
    </>
  )
}

export default memo(CellAdditionalMetadata)
