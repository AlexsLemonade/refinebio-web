import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import formatURLString from 'helpers/formatURLString'
import gtag from 'analytics/gtag'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ accessionCode, title }) => {
  const { push } = useRouter()
  const { search, setSearch } = useSearchManager()

  const handleClick = () => {
    push(`/experiments/${accessionCode}/${formatURLString(title)}`)
    setSearch({ ...search, ref: 'search' })
    gtag.trackExperimentPageClick(SearchCardFooter)
  }

  return (
    <Box>
      <Button label="View Samples" secondary onClick={handleClick} />
    </Box>
  )
}

export default SearchCardFooter
