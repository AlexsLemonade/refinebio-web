import { useEffect, useState, memo } from 'react'
import { useRouter } from 'next/router'
import { useDataset } from 'hooks/useDataset'
import { isDownloadableDataset } from 'helpers/dataset'
import { Box } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import {
  DownloadEmpty,
  DownloadAdvancedOptions,
  DownloadStartProcessing,
  DownloadFilesSummary
} from 'components/Download'

export const Download = () => {
  const router = useRouter()
  const { dataset } = useDataset()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    setIsDownloadable(isDownloadableDataset(dataset))
  }, [dataset])

  return (
    <FixedContainer>
      <Box pad={{ top: 'basex7', bottom: 'large' }}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {isDownloadable && !router.query.start ? (
          <>
            <DownloadAdvancedOptions />
            <DownloadFilesSummary dataset={dataset} />
          </>
        ) : router.query.start ? (
          <DownloadStartProcessing />
        ) : (
          <Box
            pad={{
              top: 'basex14'
            }}
          >
            <DownloadEmpty />
          </Box>
        )}
      </Box>
    </FixedContainer>
  )
}

export default memo(Download)
