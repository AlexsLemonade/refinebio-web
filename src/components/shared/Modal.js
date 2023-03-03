import { useEffect } from 'react'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import { isWindow } from 'helpers/isWindow'
import { Box } from 'grommet'
import styled from 'styled-components'
import { Icon } from './Icon'
import { Portal } from './Portal'
import { SrOnly } from './SrOnly'

const ModalBox = styled(Box)`
  @keyframes zoomIn {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: zoomIn cubic-bezier(0.17, 0.67, 0.17, 1) 0.38s forwards;
  position: absolute;
  z-index: 1000;
`

export const Modal = ({
  children,
  center = true,
  fullHeight = true,
  width = 'auto',
  cleanUp = () => {}
}) => {
  const { setResponsive } = useResponsive()
  const { modal, closeModal } = useModal()

  const handleClose = () => {
    closeModal()
    cleanUp()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose()
    }
  }

  useEffect(() => {
    if (isWindow) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!modal.show) return null

  return (
    <Portal center={center}>
      <Box
        onClick={closeModal}
        height="100%"
        width="100%"
        style={{ cursor: 'default', position: 'absolute' }}
      />
      <ModalBox
        background="white"
        margin={
          center
            ? {}
            : {
                top: setResponsive('none', 'none', 'large')
              }
        }
        pad="medium"
        height={{
          min: setResponsive(
            fullHeight ? '100%' : 'none',
            fullHeight ? '100%' : 'none',
            'none'
          )
        }}
        width={setResponsive(
          fullHeight ? '100%' : '95%',
          fullHeight ? '100%' : '95%',
          width
        )}
      >
        <Box
          alignSelf="end"
          height="24px"
          role="button"
          style={{ boxShadow: 'none' }}
          onClick={handleClose}
        >
          <Icon color="gray-shade-70" name="Close" />
          <SrOnly label="Close Modal" />
        </Box>
        <Box margin={{ top: 'xsmall' }}>{children}</Box>
      </ModalBox>
    </Portal>
  )
}

export default Modal
