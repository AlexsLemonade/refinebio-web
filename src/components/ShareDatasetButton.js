import { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { useTimeoutInCallback } from 'hooks/useTimeoutInCallback'
import { useCopyToClipboard } from 'hooks/useCopyToClipboard'
import getDomain from 'helpers/getDomain'
import { Button } from 'components/Button'
import { InlineMessage } from 'components/InlineMessage'
import { Modal } from 'components/Modal'
import { TextInput } from 'components/TextInput'

export const ShareDatasetButton = ({ dataset }) => {
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()
  const { startTimer, clearTimer } = useTimeoutInCallback(() => {
    setIsCopied(false)
  }, 3000)
  const [isCopied, setIsCopied] = useState(false)
  const [value, copyText] = useCopyToClipboard(null)
  const id = `shareable-link_${dataset.id}`
  const shareableLink = `${getDomain()}/dataset/${dataset.id}?ref=share`

  const onShareClick = () => {
    openModal(id)
  }

  const onCopyClick = () => {
    copyText(shareableLink)
    setIsCopied(true)
    gtag.trackSharedDataset(dataset)
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
          onClick={onShareClick}
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
                type="success"
                label="Copied to clipboard"
                iconSize="medium"
              />
            </Box>
          )}
        </Box>
        <Box direction={setResponsive('column', 'row')} gap="small">
          <Box flex={{ grow: 1 }}>
            <TextInput value={shareableLink} />
          </Box>
          <Box>
            <Button label="Copy" primary responsive onClick={onCopyClick} />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ShareDatasetButton
