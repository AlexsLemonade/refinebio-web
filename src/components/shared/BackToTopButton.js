import { useEffect, useState } from 'react'
import { Button as sharedButton } from 'components/shared/Button'
import styled, { css } from 'styled-components'

const Button = styled(sharedButton)`
  padding: 4px 10px;
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  z-index: 10;
   ${({ theme }) => css`
   &:hover {
    background: ${theme.global.colors['gray-shade-5']}
   `}
  }
`

export const BackToTopButton = () => {
  const isWindow = typeof window !== 'undefined'
  const OFFSET = 350
  const [show, setShow] = useState(false)

  useEffect(() => {
    const toggleShow = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > OFFSET) {
        setShow(true)
      } else if (scrolled <= OFFSET) {
        setShow(false)
      }
    }

    if (isWindow) {
      window.addEventListener('scroll', toggleShow)
    }

    return () => {
      if (isWindow) {
        window.removeEventListener('scroll', toggleShow)
      }
    }
  }, [])

  return (
    <Button
      label="▲ Top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      style={{
        animation: show ? 'fadeIn .35s' : 'none',
        display: show ? 'block' : 'none'
      }}
    />
  )
}

export default BackToTopButton
