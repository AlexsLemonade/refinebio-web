import { Box, Heading, Paragraph } from 'grommet'
import { EmailForm } from './EmailForm'

// path: /download?start=true
// renders this component when no email in localStorage
export const StartProcessing = ({ dataset }) => {
  return (
    <Box align="center" alignSelf="center" width="640px">
      <Heading level={1} margin={{ bottom: 'medium' }}>
        We're almost ready to start putting your download files together!
      </Heading>
      <Paragraph size="22px">
        Enter your email and we will send you the download link when your files
        are ready. It usually takes about 15-20 minutes.
      </Paragraph>
      <Box margin={{ top: 'medium' }} alignSelf="start">
        <EmailForm dataset={dataset} />
      </Box>
      <Box
        margin={{ top: 'basex8', bottom: 'xlarge' }}
        aria-hidden
        background={{
          image: "url('/illustration-download-start.svg')",
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

export default StartProcessing
