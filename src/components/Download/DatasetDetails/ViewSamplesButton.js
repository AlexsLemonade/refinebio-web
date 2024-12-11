import { Box, Heading } from 'grommet'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import { SamplesTable } from 'components/shared/SamplesTable'
import { TextCapitalized } from 'components/shared/TextCapitalized'
import { Button } from 'components/shared/Button'
import { Modal } from 'components/shared/Modal'

export const ViewSamplesButton = ({
  dataset,
  modalTitle,
  isImmutable,
  isSpeciesView = false
}) => {
  const { setResponsive } = useResponsive()
  const { openModal } = useModal()
  const id = `view-samples-${dataset.id}-${modalTitle}`

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
      modalView
      fullHeight
      height="98.8vh"
      width="99.2vw"
    >
      <Box
        pad={{
          horizontal: setResponsive('small', 'medium', 'large')
        }}
      >
        <Box margin={{ bottom: 'medium' }}>
          <Heading level={2} size="small">
            My Dataset -{' '}
            <TextCapitalized
              text={isSpeciesView ? formatString(modalTitle) : modalTitle}
            />{' '}
            Samples
          </Heading>
        </Box>
        <SamplesTable dataset={dataset} modalView isImmutable={isImmutable} />
      </Box>
    </Modal>
  )
}

export default ViewSamplesButton
