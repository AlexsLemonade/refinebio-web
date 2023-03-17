import { Box, Text } from 'grommet'
import { Button } from 'components/shared/Button'

export const MissingResultsAlert = ({ openMissingFormHandler }) => {
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
      <Button
        label="Let us know"
        link
        linkFontSize="16px"
        onClick={openMissingFormHandler}
      />
    </Box>
  )
}

export default MissingResultsAlert
