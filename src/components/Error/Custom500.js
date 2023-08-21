import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { Row } from 'components/shared/Row'

export const Custom500 = () => {
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
          Uh-oh something went wrong!
        </Heading>
        <Box
          align="center"
          direction={setResponsive('column', 'row')}
          gap="xsmall"
        >
          <Paragraph size="large">Try refreshing the page or</Paragraph>
          <Button label="Go Back" primary responsive onClick={goBack} />
        </Box>
      </Box>
      <Box
        aria-hidden
        background={{
          image: "url('/spilled-sample.svg')",
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

export default Custom500
