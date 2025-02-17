import { useRouter } from 'next/router'
import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/FixedContainer'
import { Icon } from 'components/Icon'
import { SrOnly } from 'components/SrOnly'

const statusConfigs = {
  error: {
    iconName: 'Warning',
    background: 'error'
  },
  info: {
    iconName: 'Info',
    background: 'info'
  },
  success: {
    iconName: 'Success',
    background: 'success'
  }
}

export const Notification = () => {
  const {
    push,
    pathname,
    query: { message, status }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const defaultStatus = 'info'
  const { background, iconName } = statusConfigs[status || defaultStatus]

  if (!message) return null

  const handleClose = () => {
    push({}, pathname)
  }

  return (
    <Box background={background}>
      <FixedContainer
        align="center"
        direction="row"
        justify="between"
        pad={{ horizontal: 'medium', vertical: 'small' }}
      >
        <Box
          align="center"
          direction="row"
          gap="xsmall"
          justify="center"
          width="100%"
        >
          <Icon name={iconName} color="white" size="20px" />
          <Text
            size={setResponsive('small', 'medium')}
            color="white"
            width={setResponsive('100px', 'auto')}
          >
            {message}
          </Text>
        </Box>
        <Box role="button" style={{ boxShadow: 'none' }} onClick={handleClose}>
          <Icon color="white" name="Close" size="small" />
          <SrOnly label="Close this notification" />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default Notification
