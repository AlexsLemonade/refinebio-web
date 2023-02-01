import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { isMatchPath } from 'helpers/isMatchPath'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'

// render <ParticlesBg /> only in client
const ParticlesBg = dynamic(() => import('../ParticlesBg'), {
  ssr: false
})

export const Band = ({ bandHeight, light = false, ...props }) => {
  const router = useRouter()

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
      {isMatchPath(router.pathname, '/compendia/[type]') && (
        <Box
          height="10000%" // for the container to stretch
          style={{
            opacity: 0.2,
            overflow: 'hidden',
            position: 'relativve'
          }}
        >
          <ParticlesBg />
        </Box>
      )}
      <FixedContainer height="100%">
        <Box
          aria-hidden
          background={
            !light
              ? {
                  opacity: '0.1',
                  image: "url('/circus-plot.svg')",
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
