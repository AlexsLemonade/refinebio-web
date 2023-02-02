import { useEffect, useState, memo } from 'react'
import { useDataset } from 'hooks/useDataset'
import { isDownloadableDataset } from 'helpers/dataset'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { DownloadEmpty, DownloadAdvancedOptions } from 'components/Download'

export const Download = () => {
  const { dataset } = useDataset()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    setIsDownloadable(isDownloadableDataset(dataset))
  }, [dataset])

  return (
    <FixedContainer>
      <Box pad={{ top: 'basex7', bottom: 'large' }}>
        {isDownloadable ? (
          <DownloadAdvancedOptions />
        ) : (
          <Box pad={{ top: 'basex14' }}>
            <DownloadEmpty />
          </Box>
        )}
      </Box>
    </FixedContainer>
  )
}

export default memo(Download)
