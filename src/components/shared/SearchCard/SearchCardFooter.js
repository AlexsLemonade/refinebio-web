import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useSearchManager } from 'hooks/useSearchManager'
import formatURLString from 'helpers/formatURLString'
import gtag from 'analytics/gtag'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ experiment }) => {
  const { accession_code: accessionCode, title } = experiment
  const { push } = useRouter()
  const { setSearchParams } = useSearchManager()

  const handleClick = () => {
    setSearchParams((prev) => ({ ...prev, ref: 'search' }))
    gtag.trackExperimentPageClick(SearchCardFooter)
    push(`/experiments/${accessionCode}/${formatURLString(title)}`)
  }

  return (
    <Box>
      <Button label="View Samples" secondary onClick={handleClick} />
    </Box>
  )
}

export default SearchCardFooter
