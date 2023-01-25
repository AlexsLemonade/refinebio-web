import { memo } from 'react'
import { useDataset } from 'hooks/useDataset'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  DownloadEmpty,
  DownloadError,
  DownloadProcessing,
  DownloadReady,
  DownloadRegenerate,
  DownloadStart
} from 'components/Download'

export const Download = () => {
  const { dataset } = useDataset()

  // const isDownloadableDataset = dataset && Object.keys(dataset).length > 0

  return (
    <Box>
      <FixedContainer>
        <Box pad={{ top: 'basex14', bottom: 'large' }}>
          {/* {!isDownloadableDataset && <DownloadEmpty />} */}
          {/* <DownloadProcessing dataset={dataset} /> */}
          {/* <DownloadReady dataset={dataset} /> */}
          {/* <DownloadRegenerate dataset={dataset} /> */}
          {/* <DownloadError dataset={dataset} /> */}
          <DownloadStart />
        </Box>
      </FixedContainer>
    </Box>
  )
}

export default memo(Download)
