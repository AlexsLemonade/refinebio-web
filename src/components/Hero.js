import { Box } from 'grommet'

export const Hero = ({ header, body, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" justify="center" {...props}>
      {/* fixed max width to preserve the UI layout */}
      <Box width="815px" margin={{ top: '80px', bottom: '96px' }}>
        {header}
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={{ vertical: 'xxxxlarge' }}
          round="8px"
        >
          {body}
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
