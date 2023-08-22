import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'

export const Custom404 = () => {
  const { back, events } = useRouter()
  const { setResponsive } = useResponsive()

  useEffect(() => {
    const forceRefresh = (url) => {
      window.location = url
    }
    events.on('routeChangeStart', forceRefresh)
  })

  const goBack = () => {
    back()
  }

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      gap="xlarge"
      justify="center"
      margin={{ top: setResponsive('none', 'none', 'basex15') }}
    >
      <Box
        align={setResponsive('center', 'center', 'start')}
        margin={{ top: 'basex8' }}
      >
        <Heading level={1} margin={{ bottom: 'small' }} size="small">
          The page you are looking for isn’t expressed.
        </Heading>
        <Paragraph size="large">Please try again later..</Paragraph>
        <Button
          label="Go Back"
          margin={{ top: 'medium' }}
          primary
          responsive
          onClick={goBack}
        />
      </Box>
      <Box
        aria-hidden
        background={{
          image: "url('/illustration-reward-poster.svg')",
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        alignSelf={setResponsive('center', 'center', 'start')}
        // to preserve the height of SVG image
        height={setResponsive('250px', '350px')}
        width={setResponsive('250px', '350px')}
      />
    </Row>
  )
}

export default Custom404
