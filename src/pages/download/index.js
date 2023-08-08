/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { Box, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import scrollToTop from 'helpers/scrollToTop'
import { isDownloadableDataset } from 'helpers/dataset'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
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
  const {
    query: { start }
  } = useRouter()

  const { loading, getDatasetDetails, dataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    getDatasetDetails()
  }, [])

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
      {loading ? (
        <Box align="center" fill justify="center" margin={{ top: 'large' }}>
          <Spinner />
        </Box>
      ) : (
        <Box pad={{ top: 'basex7', bottom: 'large' }}>
          {dataset && isDownloadable && !start ? (
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
          ) : start ? (
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
      )}
    </FixedContainer>
  )
}

export default memo(Download)
