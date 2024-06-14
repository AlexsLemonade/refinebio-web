import { useRouter } from 'next/router'
import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { SrOnly } from 'components/shared/SrOnly'

// supported types: 'error', 'info', 'success'
const types = {
  error: {
    icon: 'Warning', // icon namne
    color: 'error' // icon color
  },
  info: {
    icon: 'Info',
    color: 'info'
  },
  success: {
    icon: 'Success',
    color: 'success'
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
  const { color, icon } = types[status || defaultStatus]

  if (!message) return null

  const handleClose = () => {
    push({}, pathname)
  }

  return (
    <Box background={color}>
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
          <Icon name={icon} color="white" size="20px" />
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
