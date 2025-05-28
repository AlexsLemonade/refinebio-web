import { Box } from 'grommet'
import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/Button'
import { InlineMessage } from 'components/InlineMessage'

export const RemoveDatasetButton = ({ dataToRemove }) => {
  const { loading, removeSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const handleClick = () => {
    removeSamples(dataToRemove)
    gtag.trackDatasetAction(RemoveDatasetButton)
  }

  return (
    <Box align="center" direction="row" wrap>
      <InlineMessage
        type="success"
        label="Added to Dataset"
        iconSize="small"
        height="16px"
      />
      <Button
        isLoading={loading}
        label="Remove"
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        width="50px"
        onClick={handleClick}
      />
    </Box>
  )
}

RemoveDatasetButton.displayName = 'RemoveDatasetButton'

export default RemoveDatasetButton
