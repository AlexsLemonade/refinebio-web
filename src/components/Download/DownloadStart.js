import { useResponsive } from 'hooks/useResponsive'
import { Box, Heading, Paragraph } from 'grommet'
import { DownloadEmailForm } from './DownloadEmailForm'

// When a download is started the user visits the page /download?start=true

// This component gets rendereded when no email has been assigned
export const DownloadStart = () => {
  const { setResponsive } = useResponsive()

  return (
    <Box align="center" alignSelf="center" width="640px">
      <Heading
        level={2}
        margin={{ bottom: 'small' }}
        size={setResponsive('h2_small', 'h2_large')}
      >
        We&#39;re putting your download files together. It usually takes 15- 20
        minutes.
      </Heading>
      <Paragraph>
        Enter your email and we will email you when the files are ready for
        download.
      </Paragraph>
      <Box margin={{ top: 'medium' }}>
        <DownloadEmailForm />
      </Box>
      <Box
        margin={{ top: 'basex8', bottom: 'xlarge' }}
        aria-hidden
        background={{
          image: "url('illustration-download-start.svg')",
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        // to preserve the height of SVG image
        height="172px"
        width="100%"
      />
    </Box>
  )
}

export default DownloadStart
