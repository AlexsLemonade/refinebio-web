import { Box, Heading, Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import getDomain from 'helpers/getDomain'
import { Anchor } from 'components/Anchor'
import { Button } from 'components/Button'
import { IconProcessingGears } from 'components/IconProcessingGears'

export const ProcessingDatasetPillModal = ({ accessionCode, id }) => {
  const { email, getProcessingDatasetByAccession } = useDatasetManager()
  const { closeModal } = useModal()
  const { setResponsive } = useResponsive()

  return (
    <Box
      pad={{
        horizontal: setResponsive('medium', 'xlarge'),
        vertical: setResponsive('medium', 'large')
      }}
      align="center"
    >
      <Box margin={{ bottom: 'small' }}>
        <Heading level={1}>Your dataset is being processed.</Heading>
      </Box>

      <Paragraph>
        An email with a download link will be sent to <strong>{email}</strong>{' '}
        when the dataset is ready or you can track the status{' '}
        <Anchor
          label="here"
          href={`${getDomain()}/dataset/${getProcessingDatasetByAccession(
            accessionCode
          )}`}
          target="_self"
        />
        .
      </Paragraph>
      <Box margin={{ vertical: 'large' }}>
        <IconProcessingGears width={114} height={104} />
      </Box>
      <Box>
        <Button
          label="Continue Browsing"
          secondary
          responsive
          onClick={() => closeModal(id)}
        />
      </Box>
    </Box>
  )
}

export default ProcessingDatasetPillModal
