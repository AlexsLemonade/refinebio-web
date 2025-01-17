import { useRouter } from 'next/router'
import { Box } from 'grommet'
import formatURLString from 'helpers/formatURLString'
import gtag from 'analytics/gtag'
import { Button } from 'components/shared/Button'

export const SearchCardFooter = ({ experiment }) => {
  const { accession_code: accessionCode, title } = experiment
  const { push } = useRouter()

  const handleClick = () => {
    gtag.trackExperimentPageClick(SearchCardFooter)
    push({
      pathname: `/experiments/${accessionCode}/${formatURLString(title)}`,
      query: { ref: 'view-samples' }
    })
  }

  return (
    <Box>
      <Button label="View Samples" secondary onClick={handleClick} />
    </Box>
  )
}

export default SearchCardFooter
