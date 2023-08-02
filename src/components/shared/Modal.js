import { useEffect } from 'react'
import { useModal } from 'hooks/useModal'
import { useResponsive } from 'hooks/useResponsive'
import isWindow from 'helpers/isWindow'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { Icon } from 'components/shared/Icon'
import { Portal } from 'components/shared//Portal'
import { SrOnly } from 'components/shared//SrOnly'
import styled from 'styled-components'

const ModalBox = styled(Box)`
  @keyframes zoomIn {
    0% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
  animation: zoomIn cubic-bezier(0.17, 0.67, 0.17, 1) 0.3s forwards;
  position: absolute;
  z-index: 1000;
`
// e.g.) pass the unique 'id' to openModal method in the 'button' prop
// <Modal button={<Button label="Open Modal" onClick={()=> openModal(id)}>}>
//    {children}
// </Modal>
// NOTE: nested modals will simply stack on top of one another, and they
// will have its '< Back' button if the prop 'nested' is set to true (by default it's false)

export const Modal = ({
  id, // must be unique
  button, // the button whicn opens a modal
  children,
  center = true,
  fullHeight = true, // for responsive views (mobole/tablet)
  height = 'none',
  width = 'auto',
  nested = false, // if true, show '< Back' button in a modal
  cleanUp = () => {}
}) => {
  const { setResponsive } = useResponsive()
  const { modal, closeModal } = useModal()
  const modalCount = Object.keys(modal).length

  const handleClose = () => {
    closeModal(id)
    cleanUp()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose()
      cleanUp()
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

  return (
    <>
      {button}
      {modal && modal[id] && modal[id].show ? (
        <Portal center={center}>
          <Box
            onClick={handleClose}
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
                fullHeight ? '100%' : height,
                fullHeight ? '100%' : height,
                height
              )
            }}
            width={setResponsive(
              fullHeight ? '100%' : '95%',
              fullHeight ? '100%' : '95%',
              width
            )}
          >
            <Box direction="row" justify="between">
              <Box>
                {modalCount > 1 && nested && Object.keys(modal)[0] !== id && (
                  <Box
                    align="center"
                    direction="row"
                    gap="2px"
                    margin={{ bottom: 'small' }}
                  >
                    <Icon color="brand" name="ChevronLeft" size="12px" />
                    <Button
                      label="Back"
                      link
                      linkFontSize="medium"
                      onClick={() => closeModal(id)}
                    />
                  </Box>
                )}
              </Box>
              <Box
                height="24px"
                width="24px"
                role="button"
                style={{ boxShadow: 'none' }}
                onClick={handleClose}
              >
                <Icon color="gray-shade-70" name="Close" />
                <SrOnly label="Close Modal" />
              </Box>
            </Box>
            <Box margin={{ top: 'xsmall' }}>{children}</Box>
          </ModalBox>
        </Portal>
      ) : null}
    </>
  )
}

export default Modal
