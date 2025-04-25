import { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { useTimeoutInCallback } from 'hooks/useTimeoutInCallback'
import { useCopyToClipboard } from 'hooks/useCopyToClipboard'
import getDomain from 'helpers/getDomain'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Modal } from 'components/shared/Modal'
import { TextInput } from 'components/shared/TextInput'

export const ShareDatasetButton = ({ datasetId }) => {
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()
  const { startTimer, clearTimer } = useTimeoutInCallback(() => {
    setIsCopied(false)
  }, 3000)
  const [isCopied, setIsCopied] = useState(false)
  const [value, handdleCopy] = useCopyToClipboard(null)
  const id = `shareable-link_${datasetId}`
  const shareableLink = `${getDomain()}/dataset/${datasetId}?ref=share`

  const handleClick = (link) => {
    handdleCopy(link)
    setIsCopied(true)
  }

  useEffect(() => {
    startTimer()
    return () => clearTimer()
  }, [isCopied])

  return (
    <Modal
      id={id}
      button={
        <Button
          label="Share Dataset"
          secondary
          responsive
          onClick={() => openModal(id)}
        />
      }
      fullHeight={false}
    >
      <Box
        margin={{ bottom: 'medium' }}
        pad={{ bottom: 'small', horizontal: 'large' }}
        width="625px"
      >
        <Heading level={1}>Shareable Link</Heading>
        <Box height="24px" margin={{ vertical: '2px' }}>
          {value && (
            <Box
              animation={{
                type: isCopied ? 'fadeIn' : 'fadeOut',
                duration: 300
              }}
            >
              <InlineMessage
                color="success"
                fontColor="success"
                iconSize="medium"
                label="Copied to clipboard"
              />
            </Box>
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
              onClick={() => handleClick(shareableLink)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ShareDatasetButton
