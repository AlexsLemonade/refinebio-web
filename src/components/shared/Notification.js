import { useRouter } from 'next/router'
import { useResponsive } from 'hooks/useResponsive'
import { Box, Text } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { SrOnly } from 'components/shared/SrOnly'

export const Notification = () => {
  const router = useRouter()
  const { setResponsive } = useResponsive()
  const {
    query: { message, status }
  } = router

  if (!message) return null

  const handleClose = () => {
    router.push({}, '/download')
  }

  return (
    <Box background={status}>
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
          <Icon
            name={`${status.slice(0, 1).toUpperCase() + status.slice(1)}`}
            color="white"
            size="20px"
          />
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
