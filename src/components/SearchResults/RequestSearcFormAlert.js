import { Box, Text } from 'grommet'
import { RequestSearchFormButton } from './RequestSearchFormButton'

export const RequestSearcFormAlert = () => {
  return (
    <Box
      animation={{ type: 'fadeIn', duration: 300 }}
      alignSelf="center"
      direction="row"
      elevation="medium"
      gap="xxsmall"
      margin={{ vertical: 'medium' }}
      pad={{ horizontal: 'large', vertical: 'medium' }}
      width="fit-content"
    >
      <Text> Didn't see a related experiment?</Text>
      <RequestSearchFormButton size="16px" />
    </Box>
  )
}

export default RequestSearcFormAlert
