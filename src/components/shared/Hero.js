import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({ header, body, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" justify="center" {...props}>
      <Box
        width="815px" // fixed value to preserve the UI layout
        margin={{
          top: setResponsive('xxxlarge', 'xxxxxxlarge'),
          bottom: setResponsive('xxxlarge', 'xxxxxxxlarge')
        }}
      >
        {header}
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={{
            horizontal: setResponsive('large', 'xxxxxxxlarge'),
            vertical: setResponsive('32px', 'xxxxlarge')
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
