/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { Box, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import scrollToTop from 'helpers/scrollToTop'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
import { ShareDatasetButton } from 'components/Dataset'
import {
  DatasetSummary,
  DatasetDetails,
  EmptyDataset,
  AdvancedOptions,
  StartProcessing,
  FilesSummary
} from 'components/Download'

export const Download = () => {
  const {
    query: { start }
  } = useRouter()

  const { dataset, loading, getDatasetDetails, getTotalSamples } =
    useDatasetManager()
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
    if (!dataset) return

    setIsDownloadable(getTotalSamples(dataset.data) > 0)
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
              <AdvancedOptions />
              <FilesSummary dataset={dataset} />
              <DatasetSummary dataset={dataset} />
              <DatasetDetails dataset={dataset} />
            </>
          ) : start ? (
            <StartProcessing />
          ) : (
            <Box
              pad={{
                top: 'basex14'
              }}
            >
              <EmptyDataset />
            </Box>
          )}
        </Box>
      )}
    </FixedContainer>
  )
}

export default memo(Download)
