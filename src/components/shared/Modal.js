import { useModal } from 'hooks/useModal'
import { Box, Layer, Text } from 'grommet'
import { Icon } from './Icon'
import { SrOnly } from './SrOnly'

export const Modal = ({ label, children }) => {
  const { show, close, open } = useModal()

  return (
    <>
      <Box role="button" onClick={open} width="fit-content">
        <Text color="brand" style={{ textDecoration: 'underline' }}>
          {label}
        </Text>
        <SrOnly label="Open Modal" />
      </Box>
      {show && (
        <Layer onEsc={() => close} onClickOutside={() => close}>
          <Box>
            <Box role="button" onClick={close} alignSelf="end">
              <Icon color="gray-shade-70" name="Close" />
              <SrOnly label="Close Modal" />
            </Box>
            <Box pad={{ top: 'small' }}>{children}</Box>
          </Box>
        </Layer>
      )}
    </>
  )
}

export default Modal
