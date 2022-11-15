import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({ header, body, marginBottom = 'xxxlarge', ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box align={setResponsive('start', 'center')} {...props}>
      {header}
      <Box
        width="815px" // fixed value to preserve the UI layout
        margin={{
          bottom: setResponsive(marginBottom, 'xxxlarge', 'xxxxxxxlarge')
        }}
      >
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={{
            horizontal: setResponsive('large', 'xxxxxxxlarge'),
            vertical: setResponsive('large', 'xxxxlarge')
          }}
          round="8px"
        >
          {body}
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
