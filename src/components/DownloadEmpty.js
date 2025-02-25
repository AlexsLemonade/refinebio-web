import { useRouter } from 'next/router'
import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'

export const DownloadEmpty = () => {
  const router = useRouter()
  const { setResponsive } = useResponsive()

  return (
    <Box align="center">
      <Heading level={1} margin={{ bottom: 'small' }}>
        Your dataset is empty
      </Heading>
      <Button
        label="Search and Add Samples"
        primary
        responsive
        onClick={() => router.push('/search')}
      />
      <Box
        margin={{ top: 'basex8', bottom: 'xlarge' }}
        aria-hidden
        background={{
          image: "url('/download-no-dataset.svg')",
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        // to preserve the height of SVG image
        height={setResponsive('250px', '350px', '450px')}
        width="100%"
      />
    </Box>
  )
}

export default DownloadEmpty
