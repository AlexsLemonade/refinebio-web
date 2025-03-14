/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { Box, Heading } from 'grommet'
import { useRouter } from 'next/router'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import scrollTo from 'helpers/scrollTo'
import { DatasetSamples } from 'components/DatasetSamples'
import { DatasetDownloadOptionsForm } from 'components/DatasetDownloadOptionsForm'
import { DatasetEmpty } from 'components/DatasetEmpty'
import { DatasetFileSummaries } from 'components/DatasetFileSummaries'
import { DatasetStartProcessing } from 'components/DatasetStartProcessing'
import { DatasetSummary } from 'components/DatasetSummary'
import { Error } from 'components/Error'
import { FixedContainer } from 'components/FixedContainer'
import { Row } from 'components/Row'
import { ShareDatasetButton } from 'components/ShareDatasetButton'
import { Spinner } from 'components/Spinner'

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
              <DatasetDownloadOptionsForm dataset={myDataset} />
              <DatasetFileSummaries dataset={myDataset} />
              <DatasetSummary dataset={myDataset} />
              <DatasetSamples dataset={myDataset} />
            </>
          ) : start ? (
            <DatasetStartProcessing dataset={myDataset} />
          ) : (
            <Box
              pad={{
                top: 'basex14'
              }}
            >
              <DatasetEmpty />
            </Box>
          )}
        </Box>
      )}
    </FixedContainer>
  )
}

export default memo(Download)
