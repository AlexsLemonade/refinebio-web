import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import { Button } from 'components/shared/Button'
import { InlineMessage } from 'components/shared/InlineMessage'

// eslint-disable-next-line no-unused-vars
export const RemoveAddedDataset = ({ accessionCode }) => {
  const { removeAllDataset } = useDataset() // TEMPORARY
  const { setResponsive } = useResponsive()

  return (
    <Box direction="row">
      <InlineMessage label="Added to Dataset" color="success" />
      <Button
        label="Remove"
        link
        linkFontSize={setResponsive('medium', 'small')}
        margin={{ left: 'xsmall' }}
        onClick={removeAllDataset}
      />
    </Box>
  )
}

export default RemoveAddedDataset
