import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'

export const Band = ({ bandHeight, ...props }) => {
  return (
    <Box
      background="gradientBlue"
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
          background={{
            opacity: '0.1',
            image: " url('circus-plot.svg')",
            position: 'center 90%',
            repeat: 'no-repeat'
          }}
          fill
          height="100%"
        />
      </FixedContainer>
    </Box>
  )
}

export default Band
