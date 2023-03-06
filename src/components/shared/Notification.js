import { useRouter } from 'next/router'
import { Box, Text } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { SrOnly } from 'components/shared/SrOnly'

export const Notification = () => {
  const router = useRouter()
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
          <Text color="white" style={{ lineHeight: 2 }}>
            {message}
          </Text>
        </Box>
        <Box
          alignSelf="end"
          role="button"
          style={{ boxShadow: 'none' }}
          onClick={handleClose}
        >
          <Icon color="white" name="Close" size="small" />
          <SrOnly label="Close this notification" />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default Notification
