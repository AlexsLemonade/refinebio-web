import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/Row'

export const ErrorTemplate = ({
  heading,
  body,
  img,
  align = 'start',
  direction = 'row',
  marginTop = 'basex15',
  marginBottom = 'none'
}) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', direction)}
      gap="xlarge"
      justify="center"
      margin={{
        top: setResponsive('none', 'none', marginTop),
        bottom: marginBottom
      }}
    >
      <Box
        align={setResponsive('center', 'center', align)}
        margin={{ top: 'basex8' }}
      >
        <Heading level={1} margin={{ bottom: 'small' }} size="medium">
          {heading}
        </Heading>
        {body}
      </Box>
      <Box
        aria-hidden
        background={{
          image: `url(${img})`,
          position: 'center',
          repeat: 'no-repeat',
          size: 'contain'
        }}
        alignSelf={setResponsive('center', 'center', align)}
        // to preserve the size of SVG image
        height={setResponsive('250px', '350px')}
        width={setResponsive('250px', '350px')}
      />
    </Row>
  )
}

export default ErrorTemplate
