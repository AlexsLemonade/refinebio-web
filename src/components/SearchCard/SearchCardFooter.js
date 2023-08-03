import { useRouter } from 'next/router'
import { useSearchManager } from 'hooks/useSearchManager'
import formatURLString from 'helpers/formatURLString'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode, title }) => {
  const { push } = useRouter()
  const { search, setSearch } = useSearchManager()

  return (
    <Box>
      <Button
        label="View Samples"
        secondary
        onClick={() => {
          push(`/experiments/${accessionCode}/${formatURLString(title)}`)
          setSearch({ ...search, ref: 'search' })
        }}
      />
    </Box>
  )
}

export default SearchCardFooter
