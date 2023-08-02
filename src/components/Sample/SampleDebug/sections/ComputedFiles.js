import { memo } from 'react'
import { Box, Heading, Text } from 'grommet'
import { TextNull } from 'components/shared/TextNull'
import { useSampleDebug } from 'hooks/useSampleDebug'

export const ComputedFiles = () => {
  const {
    data: { computedFiles }
  } = useSampleDebug()

  return (
    <Box className="sample-debug-section">
      <Box margin={{ bottom: 'xsmall' }}>
        <Heading level={3}>Computed Files</Heading>
      </Box>
      {computedFiles && computedFiles.length > 0 ? (
        computedFiles.map((file) => <Text key={file.id}>{file.filename}</Text>)
      ) : (
        <TextNull text="None" />
      )}
    </Box>
  )
}

export default memo(ComputedFiles)
