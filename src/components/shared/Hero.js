import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({
  boxPadding = {},
  boxWidth = '100%',
  children,
  header,
  marginBottom = 'basex7',
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box align={setResponsive('start', 'center')} {...props}>
      {header}
      <Box
        width={boxWidth}
        margin={{
          bottom: setResponsive(marginBottom, 'basex7', 'basex12')
        }}
      >
        <Box
          align="center"
          background="white"
          elevation="xlarge"
          pad={boxPadding}
          round="xsmall"
          width={boxWidth}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default Hero
