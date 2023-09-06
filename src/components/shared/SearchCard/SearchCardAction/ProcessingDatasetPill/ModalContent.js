import { Box, Heading, Paragraph, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import getDomain from 'helpers/getDomain'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { IconProcessingGears } from 'components/shared/IconProcessingGears'

export const ModalContent = ({ dataset, email, closeModal }) => {
  const { datasetId } = useDatasetManager()
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
        An email with a download link will be sent to{' '}
        <Text>{dataset?.email || email}</Text> when the dataset is ready or you
        can track the status{' '}
        <Anchor
          label="here"
          href={`${getDomain()}/dataset/${dataset?.id || datasetId}`}
          target="_blank"
        />{' '}
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
          onClick={closeModal}
        />
      </Box>
    </Box>
  )
}

export default ModalContent
