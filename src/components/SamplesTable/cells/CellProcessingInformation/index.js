import { memo } from 'react'
import moment from 'moment'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'
import { TextNull } from 'components/shared/TextNull'
import { ModalContent } from './ModalContent'

export const CellProcessingInformation = ({
  row: { original: sample },
  linkFontSize = '14px'
}) => {
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()

  if (!sample.is_processed || !sample.results || !sample.results.length) {
    return <TextNull text="N/A" />
  }

  const id = `processing-information_${sample.id}`
  const processorBlacklist = ['MultiQC', 'Salmontools']
  // returns the computational results to display in the modal
  const computationalResults = sample.results
    .filter((result) => !processorBlacklist.includes(result.processor.name))
    .filter(
      // currently API returns the duplicated computational results
      // that needs to be filtered out
      (result, i, arr) =>
        arr.findIndex((r2) => r2.processor.name === result.processor.name) === i
    )
    .sort((result1, result2) =>
      moment(result1.time_start).diff(moment(result2.time_start))
    )
  const pipelinesText = computationalResults
    .map((result) => result.processor.name)
    .join(', ')

  return (
    <Modal
      id={id}
      button={
        <Button
          label={pipelinesText}
          link
          linkFontSize={linkFontSize}
          onClick={() => openModal(id)}
        />
      }
      center={false}
      width={setResponsive('100vw', '100vw', '950px')}
    >
      <ModalContent results={computationalResults} sample={sample} />
    </Modal>
  )
}

export default memo(CellProcessingInformation)
