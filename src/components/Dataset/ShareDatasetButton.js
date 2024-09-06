import { useEffect, useState } from 'react'
import { Box, Heading } from 'grommet'
import gtag from 'analytics/gtag'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { useTimeoutInCallback } from 'hooks/useTimeoutInCallback'
import { useCopyToClipboard } from 'hooks/useCopyToClipboard'
import getDomain from 'helpers/getDomain'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Modal } from 'components/shared/Modal'
import { TextInput } from 'components/shared/TextInput'

export const ShareDatasetButton = ({ dataset }) => {
  const { openModal } = useModal()
  const { setResponsive } = useResponsive()
  const { startTimer, clearTimer } = useTimeoutInCallback(() => {
    setIsCopied(false)
  }, 3000)
  const [isCopied, setIsCopied] = useState(false)
  const [value, handdleCopy] = useCopyToClipboard(null)
  const { id: datasetId } = dataset
  const id = `shareable-link_${datasetId}`
  const shareableLink = `${getDomain()}/dataset/${datasetId}?ref=share`

  const handleShare = () => {
    openModal(id)
    gtag.trackSharedDataset(dataset)
  }

  const handleCopy = (link) => {
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
          onClick={handleShare}
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
            <Button
              label="Copy"
              primary
              responsive
              onClick={() => handleCopy(shareableLink)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ShareDatasetButton
