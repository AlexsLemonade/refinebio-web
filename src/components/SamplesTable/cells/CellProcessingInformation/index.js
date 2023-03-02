import { memo } from 'react'
import moment from 'moment'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/shared/Button'
import { TextNull } from 'components/shared/TextNull'
import { ModalContent } from './ModalContent'

export const CellProcessingInformation = ({ row: { original: sample } }) => {
  if (!sample.is_processed || !sample.results || !sample.results.length) {
    return <TextNull text="N/A" />
  }

  const { modal, openModal } = useModal()
  const id = `processing-information_${sample.id}`
  const processorBlacklist = ['MultiQC', 'Salmontools']
  // returns the computational results to display in the modal
  const computationalResults = sample.results
    .filter((result) => !processorBlacklist.includes(result.processor.name))
    .filter(
      // current API returns the duplicated computational results
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
    <>
      <Button label={pipelinesText} link onClick={() => openModal(id)} />
      {modal.id === id && (
        <ModalContent results={computationalResults} sample={sample} />
      )}
    </>
  )
}

export default memo(CellProcessingInformation)
