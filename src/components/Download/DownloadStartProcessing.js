import { Box, Heading } from 'grommet'
import { DownloadEmailForm } from './DownloadEmailForm'

// path: /download?start=true
// renders this component when no email is assigned

export const DownloadStartProcessing = () => {
  const handleSubmitEmailForm = () => {}

  return (
    <Box align="center" alignSelf="center" width="640px">
      <Heading level={1} margin={{ bottom: 'small' }}>
        We&#39;re putting your download files together. It usually takes 15- 20
        minutes.
      </Heading>
      <Heading level={2}>
        Enter your email and we will email you when the files are ready for
        download.
      </Heading>
      <Box margin={{ top: 'medium' }} alignSelf="start">
        <DownloadEmailForm submitHandler={handleSubmitEmailForm} />
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

export default DownloadStartProcessing
