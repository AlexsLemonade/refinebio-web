import { memo } from 'react'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { SamplesTableAdditionalMetadataModal } from 'components/SamplesTableAdditionalMetadataModal'
import { TextNull } from 'components/TextNull'

export const SamplesTableAdditionalMetadataCell = ({
  row: { original: sample },
  linkFontSize = '14px'
}) => {
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()

  if (sample.annotations.length === 0) {
    return <TextNull text="N/A" />
  }

  const id = `metadata_${sample.id}`
  const annotations = sample.annotations.map((annotation) => annotation.data)

  return (
    <Modal
      id={id}
      button={
        <Button
          label="View"
          link
          linkFontSize={linkFontSize}
          onClick={() => openModal(id)}
        />
      }
      center={false}
      width={setResponsive('100vw', '100vw', '950px')}
    >
      <SamplesTableAdditionalMetadataModal annotations={annotations} />
    </Modal>
  )
}

export default memo(SamplesTableAdditionalMetadataCell)
