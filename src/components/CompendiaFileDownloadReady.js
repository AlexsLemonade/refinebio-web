import { Heading, Box, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatBytes from 'helpers/formatBytes'
import formatString from 'helpers/formatString'
import { Button } from 'components/Button'
import { Column } from 'components/Column'
import { Icon } from 'components/Icon'

export const CompendiaFileDownloadReady = ({ compendium, downloadUrl }) => {
  const { setResponsive } = useResponsive()

  return (
    <Column align={setResponsive('center', 'start')}>
      <Box direction="row" gap="xxsmall" margin={{ bottom: 'small' }}>
        <Heading level={1}>
          <Icon color="success" name="Success" /> Downloading{' '}
          {formatString(compendium.primary_organism_name)} compendium...
        </Heading>
      </Box>
      <Paragraph>
        Download size: {formatBytes(compendium.computed_file.size_in_bytes)}
      </Paragraph>
      <Box direction="row" gap="xsmall" margin={{ top: 'xsmall' }}>
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

export default CompendiaFileDownloadReady
