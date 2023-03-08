import { memo } from 'react'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { TextNull } from 'components/shared/TextNull'
import { ModalContent } from './ModalContent'

export const CellAdditionalMetadata = ({ row: { original: sample } }) => {
  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  const { openModal } = useModal()
  const { setResponsive } = useResponsive()
  const id = `metadata_${sample.id}`
  const annotations = sample.annotations.map((annotation) => annotation.data)

  return (
    <Modal
      id={id}
      button={<Button label="View" link onClick={() => openModal(id)} />}
      center={false}
      width={setResponsive('100vw', '100vw', '950px')}
    >
      <ModalContent annotations={annotations} />
    </Modal>
  )
}

export default memo(CellAdditionalMetadata)
