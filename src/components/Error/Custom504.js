import { Box, Heading, Paragraph } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'

export const Custom504 = () => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      gap="xlarge"
      justify="center"
      margin={{
        top: setResponsive('none', 'none', 'basex15'),
        bottom: setResponsive('basex7', 'none')
      }}
    >
      <Box
        align={setResponsive('center', 'center', 'start')}
        margin={{ top: 'basex8' }}
        width={{ max: '450px' }}
      >
        <Heading level={1} margin={{ bottom: 'small' }} size="small">
          We’re a little overwhelmed at the moment.
        </Heading>
        <Paragraph size="large">
          We apologize for the inconvenience. We are working hard to restore
          normal service.
        </Paragraph>
      </Box>
      <Box
        aria-hidden
        background={{
          image: "url('/distressed-tubey.svg')",
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

export default Custom504
