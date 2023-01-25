import { formatURLString } from 'helpers/formatURLString'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode = '', title = '' }) => {
  return (
    <Box>
      <Button
        label="View Samples"
        href={`experiments/${accessionCode}/${formatURLString(title)}`}
        secondary
      />
    </Box>
  )
}

export default SearchCardFooter
