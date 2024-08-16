import { Box } from 'grommet'
import gtag from 'analytics/gtag'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const RemoveDatasetButton = ({ dataToRemove, label = 'Remove' }) => {
  const { loading, removeSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const handleClick = () => {
    removeSamples(dataToRemove)
    gtag.myDatasetAction(label)
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
        label={label}
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        width="50px"
        onClick={handleClick}
      />
    </Box>
  )
}

export default RemoveDatasetButton
