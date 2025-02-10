import { Heading, Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { Icon } from 'components/shared/Icon'

export const FileDownloadReady = ({ compendium, downloadUrl }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column align={setResponsive('center', 'start')}>
      <Box direction="row" gap="xxsmall" margin={{ bottom: 'small' }}>
        <Heading level={1}>
          <Icon color="success" name="Success" /> Downloading{' '}
          {formatString(compendium.primary_organism_name)} compendium...
        </Heading>
      </Box>
      <Box direction="row" gap="xsmall">
        <Paragraph>If the download did not start,</Paragraph>
        {downloadUrl && (
          <Button
            label="click here."
            href={downloadUrl}
            link
            linkFontSize="16px"
          />
        )}
      </Box>
    </Column>
  )
}

export default FileDownloadReady
