/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { Box, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import scrollTo from 'helpers/scrollTo'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/FixedContainer'
import { Row } from 'components/Row'
import { Spinner } from 'components/Spinner'
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
    query: { start }
  } = useRouter()
  const { myDataset, error, loading, getDataset, getTotalSamples } =
    useDatasetManager()
  const { setResponsive } = useResponsive()
  const [isDownloadable, setIsDownloadable] = useState()

  useEffect(() => {
    getDataset()
  }, [])

  useEffect(() => {
    if (!isDownloadable) {
      scrollTo()
    }
  }, [isDownloadable])

  useEffect(() => {
    if (myDataset) {
      setIsDownloadable(getTotalSamples(myDataset.data) > 0)
    } else {
      setIsDownloadable(false)
    }
  }, [myDataset])

  if (error) {
    return (
      <Error
        statusCode={error}
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
          {myDataset && isDownloadable && !start ? (
            <>
              <Row>
                <Heading
                  level={1}
                  margin={{ bottom: setResponsive('small', 'large') }}
                >
                  My Dataset
                </Heading>
                <ShareDatasetButton dataset={myDataset} />
              </Row>
              <DownloadOptionsForm dataset={myDataset} />
              <FilesSummary dataset={myDataset} />
              <DatasetSummary dataset={myDataset} />
              <DatasetDetails dataset={myDataset} />
            </>
          ) : start ? (
            <StartProcessing dataset={myDataset} />
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
