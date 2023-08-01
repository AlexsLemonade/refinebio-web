/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { useRouter } from 'next/router'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
import scrollToTop from 'helpers/scrollToTop'
import { isDownloadableDataset } from 'helpers/dataset'
import { Box, Heading } from 'grommet'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { ShareDatasetButton } from 'components/Dataset'
import {
  DownloadDatasetSummary,
  DownloadDatasetDetails,
  DownloadEmpty,
  DownloadAdvancedOptions,
  DownloadStartProcessing,
  DownloadFilesSummary
} from 'components/Download'

export const Download = () => {
  const router = useRouter()
  const { dataset } = useDataset()
  const { setResponsive } = useResponsive()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    if (!isDownloadable) {
      scrollToTop()
    }
  }, [isDownloadable])

  useEffect(() => {
    setIsDownloadable(isDownloadableDataset(dataset?.data))
  }, [dataset])

  return (
    <FixedContainer>
      <Box pad={{ top: 'basex7', bottom: 'large' }}>
        {dataset && isDownloadable && !router.query.start ? (
          <>
            <Row>
              <Heading
                level={1}
                margin={{ bottom: setResponsive('small', 'large') }}
              >
                My Dataset
              </Heading>
              <ShareDatasetButton datasetId={dataset?.id} />
            </Row>
            <DownloadAdvancedOptions />
            <DownloadFilesSummary dataset={dataset} />
            <DownloadDatasetSummary dataset={dataset} />
            <DownloadDatasetDetails dataset={dataset} />
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
