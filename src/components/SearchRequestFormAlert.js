import { Box, Text } from 'grommet'
import { SearchRequestFormButton } from 'components/SearchRequestFormButton'

export const SearchRequestFormAlert = () => {
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
      <SearchRequestFormButton size="16px" />
    </Box>
  )
}

export default SearchRequestFormAlert
