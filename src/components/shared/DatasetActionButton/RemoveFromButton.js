import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

// eslint-disable-next-line no-unused-vars
export const RemoveFromButton = ({ dataToRemove }) => {
  const { loading, removeSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()

  return (
    <Box align="center" direction="row" wrap>
      <InlineMessage
        label="Added to Dataset"
        color="success"
        iconSize="small"
        height="fit-content"
      />
      <Button
        isLoading={loading}
        label="Remove"
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        width="50px"
        onClick={() => removeSamples(dataToRemove, true)}
      />
    </Box>
  )
}

export default RemoveFromButton
