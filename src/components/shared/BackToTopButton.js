import { useEffect, useState } from 'react'
import { Box, Text } from 'grommet'
import styled, { css } from 'styled-components'

const ArrowIcon = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.global.colors.brand};
    &::before {
      border: 1px solid ${theme.global.colors.brand};
    }
  `}
  border-width: 1px 1px 0 0;
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
  const offset = 350
  const [show, setShow] = useState(false)

  const handleClick = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  const handleKeyDown = (event) => {
    event.preventDefault()
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick()
    }
  }

  useEffect(() => {
    const toggleShow = () => {
      const scrolled = document.documentElement.scrollTop
      if (scrolled > offset) {
        setShow(true)
      } else if (scrolled <= offset) {
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
    <Box
      animation={{ type: show ? 'fadeIn' : 'fadeOut', duration: 500 }}
      role="button"
      background="gray-shade-5"
      pad={{ top: 'small', bottom: 'xsmall', horizontal: 'xsmall' }}
      round="2px"
      style={{
        bottom: '5vh',
        boxShadow: 'none',
        display: show ? 'block' : 'none',
        position: 'fixed',
        right: '5vw',
        zIndex: '1000'
      }}
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <ArrowIcon
        height="6px"
        width="6px"
        margin={{ bottom: 'xsmall', horizontal: 'calc(50% - 4px)' }}
        style={{ position: 'relative', transform: ' rotate(-45deg)' }}
      />
      <Text color="brand" size="small">
        <strong>Back to Top</strong>
      </Text>
    </Box>
  )
}

export default BackToTopButton