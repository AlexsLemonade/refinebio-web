import { Box, Heading } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'

export const TwoColumns = ({ heading, body, img, marginBottom = 'none' }) => {
  const { setResponsive } = useResponsive()

  return (
    <Row
      direction={setResponsive('column', 'column', 'row')}
      gap="xlarge"
      justify="center"
      margin={{
        top: setResponsive('none', 'none', 'basex15'),
        bottom: setResponsive(marginBottom, 'none')
      }}
    >
      <Box
        align={setResponsive('center', 'center', 'start')}
        margin={{ top: 'basex8' }}
      >
        <Heading level={1} margin={{ bottom: 'small' }} size="small">
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
        alignSelf={setResponsive('center', 'center', 'start')}
        // to preserve the size of SVG image
        height={setResponsive('250px', '350px')}
        width={setResponsive('250px', '350px')}
      />
    </Row>
  )
}

export default TwoColumns
