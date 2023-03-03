/* eslint-disable no-nested-ternary */
import { useEffect, useState, memo } from 'react'
import { useRouter } from 'next/router'
import { useDataset } from 'hooks/useDataset'
import { useResponsive } from 'hooks/useResponsive'
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
      window.scrollTo(0, 0)
    }
  }, [isDownloadable])

  useEffect(() => {
    setIsDownloadable(isDownloadableDataset(dataset?.data))
  }, [dataset])

  return (
    <FixedContainer>
      <Box pad={{ top: 'basex7', bottom: 'large' }}>
        {isDownloadable && !router.query.start ? (
          <>
            <Row>
              <Heading
                level={2}
                margin={{ bottom: setResponsive('small', 'large') }}
                size={setResponsive('h2_small', 'h2_large')}
              >
                My Dataset
              </Heading>
              <ShareDatasetButton dataset={dataset} />
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
