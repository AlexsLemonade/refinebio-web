import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import { Button as sharedButton } from 'components/shared/Button'
import styled, { css } from 'styled-components'

const Button = styled(sharedButton)`
  padding: 16px 8px 2px;
  position: fixed;
  bottom: 5vh;
  right: 5vh;
  z-index: 1000;

   ${({ theme }) => css`
     background: ${theme.global.colors['gray-shade-5']};
     box-shadow: ${theme.global.elevation.light.medium};
     &:hover {
       box-shadow: none;
     }
   `}
  }
`

const ArrowIcon = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.global.colors.brand};
    &::before {
      border: 1px solid ${theme.global.colors.brand};
    }
  `}
  border-width: 1px 1px 0 0;
  margin: 0 calc(50% - 4px) 8px;
  height: 6px;
  width: 6px;
  position: relative;
  transform: rotate(-45deg);

  &::before {
    content: '';
    border-radius: 50%;
    width: 24px;
    height: 24px;
    position: absolute;
    left: -8px;
    top: -11px;
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
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      animation={{ type: show ? 'fadeIn' : '', duration: '.5s' }}
      style={{ display: show ? 'block' : 'none' }}
    >
      <ArrowIcon />
      <Text color="brand" size="small">
        <strong>Back to Top</strong>
      </Text>
    </Button>
  )
}

export default BackToTopButton
