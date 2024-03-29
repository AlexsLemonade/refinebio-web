import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Box } from 'grommet'

// set z-index value to be less than 20 to avoid conflict with Grommet's buitl-in components
export const Portal = ({ center, children, zIndex = 19 }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body')
    ref.current = document.querySelector('#portal')
    setMounted(true)
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = 'auto'
    }
  }, [mounted])

  return mounted && ref.current
    ? createPortal(
        <Box
          align="center"
          justify={center ? 'center' : 'start'}
          background="rgba6"
          height="100%"
          width="100%"
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex
          }}
        >
          {children}
        </Box>,
        ref.current
      )
    : null
}

export default Portal
