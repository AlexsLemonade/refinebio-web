import { formatURLString } from 'helpers/formatURLString'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode, title }) => {
  return (
    <Box>
      <Button
        href={`experiments/${accessionCode}/${formatURLString(title)}`}
        label="View Samples"
        secondary
      />
    </Box>
  )
}

export default SearchCardFooter
