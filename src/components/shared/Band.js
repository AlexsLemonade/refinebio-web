import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'

export const Band = ({ bandHeight, light = false, ...props }) => {
  return (
    <Box
      background={light ? 'gradient_light_reverse' : 'gradient_blue'}
      elevation="large"
      height={bandHeight}
      width="100%"
      style={{ position: 'absolute', zIndex: -1 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <FixedContainer height="100%">
        <Box
          aria-hidden
          background={
            !light
              ? {
                  opacity: '0.1',
                  image: " url('circus-plot.svg')",
                  position: 'center 90%',
                  repeat: 'no-repeat'
                }
              : {}
          }
          fill
          height="100%"
        />
      </FixedContainer>
    </Box>
  )
}

export default Band
