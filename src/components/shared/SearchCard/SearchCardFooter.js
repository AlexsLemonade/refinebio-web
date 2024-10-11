import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import formatString from 'helpers/formatString'
import formatURLString from 'helpers/formatURLString'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ experiment }) => {
  const { accession_code: accessionCode, title } = experiment
  const { push } = useRouter()
  const { search, setSearch } = useSearchManager()

  return (
    <Box>
      <Button
        label="View Samples"
        secondary
        onClick={() => {
          push(
            `/experiments/${accessionCode}/${formatURLString(
              formatString(title)
            )}`
          )
          setSearch({ ...search, ref: 'search', from: 'view-samples' })
        }}
      />
    </Box>
  )
}

export default SearchCardFooter
