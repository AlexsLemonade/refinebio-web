import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'

export const Hero = ({
  children,
  boxPadding = {},
  boxWidth = '100%',
  header,
  marginBottom = 'basex7',
  ...props
}) => {
  const { setResponsive } = useResponsive()

  return (
    <Box
      align={setResponsive('start', 'center')}
      margin={{
        bottom: setResponsive(marginBottom, 'basex7', 'basex12')
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {header}
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
  )
}

export default Hero
