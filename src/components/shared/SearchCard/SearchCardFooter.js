import { useRouter } from 'next/router'
import { Box } from 'grommet'
import gtag from 'api/analytics/gtag'
import { useSearchManager } from 'hooks/useSearchManager'
import formatURLString from 'helpers/formatURLString'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode, title }) => {
  const { push } = useRouter()
  const { search, setSearch } = useSearchManager()

  const handleClick = () => {
    push(`/experiments/${accessionCode}/${formatURLString(title)}`)
    setSearch({ ...search, ref: 'search' })
    gtag.experimentPageClick('View Samples button')
  }

  return (
    <Box>
      <Button label="View Samples" secondary onClick={handleClick} />
    </Box>
  )
}

export default SearchCardFooter
