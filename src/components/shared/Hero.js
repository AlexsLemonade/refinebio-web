import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({ header, body, ...props }) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" justify="center" {...props}>
      {/* fixed max width to preserve the UI layout */}
      <Box
        width="815px"
        margin={{
          top: setResponsive('xxxlarge', '80px'),
          bottom: setResponsive('xxxlarge', '96px')
        }}
      >
        {header}
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={{
            horizontal: setResponsive('large', '96px'),
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
