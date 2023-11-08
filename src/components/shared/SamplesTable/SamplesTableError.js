import { Box, Text } from 'grommet'
import { Button } from 'components/shared/Button'
import { SamplesTableEmpty } from './SamplesTableEmpty'

export const SamplesTableError = ({ onClick }) => {
  return (
    <SamplesTableEmpty background="rgbaLight7">
      <Box direction="row" gap="xxsmall">
        <Text color="error">Temporarily under heavy traffic load. Please</Text>
        <Button
          label="try again"
          link
          linkColor="error"
          linkFontSize="medium"
          onClick={onClick}
        />
        <Text color="error">later.</Text>
      </Box>
    </SamplesTableEmpty>
  )
}

export default SamplesTableError
