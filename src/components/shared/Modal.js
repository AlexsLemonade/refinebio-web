import { useModal } from 'hooks/useModal'
import { Box, Layer } from 'grommet'
import { Icon } from './Icon'
import { SrOnly } from './SrOnly'

export const Modal = ({ children }) => {
  const { modal, closeModal } = useModal()

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {modal.show && (
        <Layer onEsc={closeModal} onClickOutside={closeModal}>
          <Box>
            <Box
              role="button"
              onClick={closeModal}
              alignSelf="end"
              height="24px"
            >
              <Icon color="gray-shade-70" name="Close" />
              <SrOnly label="Close Modal" />
            </Box>
            <Box margin={{ top: 'xsmall' }}>{children}</Box>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default Modal
