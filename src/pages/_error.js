import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { getHeadingSize } from 'helpers/getHeadingSize'
import { Box, Heading, Paragraph } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'

export const ErrorPage = () => {
  const router = useRouter()
  const { setResponsive } = useResponsive()

  useEffect(() => {
    const forceRefresh = (url) => {
      window.location = url
    }
    router.events.on('routeChangeStart', forceRefresh)
  })

  const goBack = () => {
    router.back()
  }

  return (
    <FixedContainer>
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
          <Heading level={1} size={getHeadingSize('xsmall', 1)}>
            The page you are looking for isn’t expressed.
          </Heading>
          <Paragraph>Please try again later..</Paragraph>
          <Button
            label="Go Back"
            margin={{ top: 'medium' }}
            onClick={goBack}
            primary
            responsive
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
    </FixedContainer>
  )
}

export default ErrorPage
