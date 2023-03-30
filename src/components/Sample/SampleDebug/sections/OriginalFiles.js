import { memo } from 'react'
import { Box, CheckBox, Heading } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { TextNull } from 'components/shared/TextNull'
import { useSampleDebug } from 'hooks/useSampleDebug'

export const OriginalFiles = () => {
  const {
    data: { originalFiles },
    isFileSelected,
    toggleFile
  } = useSampleDebug()

  return (
    <Box>
      <Box margin={{ bottom: 'xsmall' }}>
        <Heading level={3}>Original Files</Heading>
      </Box>
      {originalFiles && originalFiles.length > 0 ? (
        originalFiles.map((file) => (
          <CheckBox
            key={file.id}
            name={`${file.id}`}
            label={
              <>
                {file.filename}
                {file.filename !== file.source_filename && ' (from archive) '}
                <Anchor
                  href={file.source_url}
                  label="download"
                  margin={{ left: 'xxsmall' }}
                />
              </>
            }
            onChange={() => toggleFile(file.id)}
            checked={isFileSelected(file.id)}
          />
        ))
      ) : (
        <TextNull text="None" />
      )}
    </Box>
  )
}

export default memo(OriginalFiles)
