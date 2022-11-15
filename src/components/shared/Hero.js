import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({
  header,
  body,
  boxPadding = {},
  containerWidth = '100%',
  marginBottom = 'xxxlarge',
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box align={setResponsive('start', 'center')} {...props}>
      {header}
      <Box
        width={containerWidth}
        margin={{
          bottom: setResponsive(marginBottom, 'xxxlarge', 'xxxxxxxlarge')
        }}
      >
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={boxPadding}
          round="8px"
        >
          {body}
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
