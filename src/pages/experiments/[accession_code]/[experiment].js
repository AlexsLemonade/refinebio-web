import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { FixedContainer } from 'components/shared/FixedContainer'

export const Experiment = () => {
  const router = useRouter()

  return (
    <Box>
      <FixedContainer pad="large">
        <Button
          label="Back to Results"
          secondary
          responsive
          onClick={() => {
            router.back()
          }}
        />
      </FixedContainer>
    </Box>
  )
}

export default Experiment
