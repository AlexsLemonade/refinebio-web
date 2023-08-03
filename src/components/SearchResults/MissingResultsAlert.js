import { Box, Text } from 'grommet'
import { MissingResultsFormButton } from './MissingResultsFormButton'

export const MissingResultsAlert = () => {
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
      <MissingResultsFormButton size="16PX" />
    </Box>
  )
}

export default MissingResultsAlert
