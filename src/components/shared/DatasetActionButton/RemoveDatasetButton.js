import { Box } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

export const RemoveDatasetButton = ({ dataToRemove }) => {
  const { setResponsive } = useResponsive()
  const handleRemove = () => {} // TEMP: replace with useDatasetManager method
  return (
    <Box align="center" direction="row" wrap>
      <InlineMessage
        label="Added to Dataset"
        color="success"
        iconSize="small"
        height="fit-content"
      />
      <Button
        label="Remove"
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        width="50px"
        onClick={() => handleRemove(dataToRemove)}
      />
    </Box>
  )
}

export default RemoveDatasetButton
