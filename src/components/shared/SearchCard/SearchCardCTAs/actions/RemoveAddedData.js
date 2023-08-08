import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

// eslint-disable-next-line no-unused-vars
export const RemoveAddedData = ({ accessionCode }) => {
  const { loading, removeExperiment } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Box direction="row">
      <InlineMessage label="Added to Dataset" color="success" />
      <Button
        isLoading={loading}
        label="Remove"
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        width="50px"
        onClick={() => removeExperiment(accessionCode)}
      />
    </Box>
  )
}

export default RemoveAddedData
