import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'

export const Band = ({ ...props }) => {
  const router = useRouter()
  const { setResponsive } = useResponsive()
  const [path, setPath] = useState('')

  useEffect(() => {
    setPath(router.asPath)
  }, [router, path])

  return (
    <Box
      background="gradient_dark"
      elevation="large"
      height={
        // fixed value to preserve the UI layout
        path === '/'
          ? setResponsive('500px', '368px')
          : setResponsive('474px', '520px')
      }
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
