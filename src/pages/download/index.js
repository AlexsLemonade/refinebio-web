/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { Box, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import scrollToTop from 'helpers/scrollToTop'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
import { ShareDatasetButton } from 'components/Dataset'
import {
  DatasetSummary,
  DatasetDetails,
  EmptyDataset,
  DownloadOptionsForm,
  StartProcessing,
  FilesSummary
} from 'components/Download'

export const Download = () => {
  const {
    query: { start, downloadOptions }
  } = useRouter()

  const {
    dataset,
    error: { hasError, statusCode },
    loading,
    getDataset,
    getTotalSamples
  } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    getDataset()
  }, [])

  useEffect(() => {
    if (!isDownloadable) {
      scrollToTop()
    }
  }, [isDownloadable])

  useEffect(() => {
    setIsDownloadable(getTotalSamples(dataset.data) > 0)
  }, [dataset])

  if (hasError) {
    return (
      <Error
        statusCode={statusCode}
        align="center"
        direction="column"
        marginTop="none"
      />
    )
  }

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
              <DownloadOptionsForm />
              <FilesSummary dataset={dataset} />
              <DatasetSummary dataset={dataset} />
              <DatasetDetails dataset={dataset} />
            </>
          ) : start ? (
            <StartProcessing
              dataset={dataset}
              downloadOptions={downloadOptions}
            />
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
