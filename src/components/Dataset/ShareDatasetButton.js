import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { useCopyToClipboard } from 'hooks/useCopyToClipboard'
import { getDomain } from 'helpers/getDomain'
import { Box, Heading } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Modal } from 'components/shared/Modal'
import { TextInput } from 'components/shared/TextInput'

export const ShareDatasetButton = ({ datasetId }) => {
  const { modal, openModal } = useModal()
  const { setResponsive } = useResponsive()
  const [value, handdleCopy] = useCopyToClipboard()
  const id = `shareable-link_${datasetId}`
  const shareableLink = `${getDomain()}/dataset/${datasetId}?ref=share`

  return (
    <>
      <Button
        label="Share Dataset"
        secondary
        responsive
        onClick={() => openModal(id)}
      />
      {modal.id === id && (
        <Modal fullHeight={false} cleanUp={() => handdleCopy(null)}>
          <Box
            margin={{ bottom: 'medium' }}
            pad={{ bottom: 'small', horizontal: 'large' }}
            width="625px"
          >
            <Heading level={1}>Shareable Link</Heading>
            <Box height="24px" margin={{ vertical: '2px' }}>
              {value && (
                <InlineMessage
                  color="success"
                  fontColor="success"
                  iconSize="medium"
                  label="Copied to clipboard"
                />
              )}
            </Box>
            <Box direction={setResponsive('column', 'row')} gap="small">
              <Box flex={{ grow: 1 }}>
                <TextInput value={shareableLink} />
              </Box>
              <Box>
                <Button
                  label="Copy"
                  primary
                  responsive
                  onClick={() => handdleCopy(shareableLink)}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  )
}

export default ShareDatasetButton
