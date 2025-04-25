import { useRouter } from 'next/router'
import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Icon } from 'components/shared/Icon'
import { SrOnly } from 'components/shared/SrOnly'

export const Notification = () => {
  const {
    push,
    query: { message, status }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const defaultStatus = 'info'

  if (!message) return null

  const handleClose = () => {
    push({}, '/download')
  }

  return (
    <Box background={status || defaultStatus}>
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
            name={`${
              (status || defaultStatus).slice(0, 1).toUpperCase() +
              (status || defaultStatus).slice(1)
            }`}
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
