import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import formatURLString from 'helpers/formatURLString'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode, title }) => {
  const { search, setSearch } = useSearchManager()

  return (
    <Box>
      <Button
        label="View Samples"
        href={`/experiments/${accessionCode}/${formatURLString(title)}`}
        secondary
        onClick={() => {
          setSearch({ ...search, ref: 'search', from: 'view-samples' })
        }}
      />
    </Box>
  )
}

export default SearchCardFooter
