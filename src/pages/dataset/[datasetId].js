import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import getDatasetState from 'helpers/getDatasetState'
import { DatasetFileSummaries } from 'components/DatasetFileSummaries'
import { DatasetPageHeader } from 'components/DatasetPageHeader'
import { DatasetSamples } from 'components/DatasetSamples'
import { DatasetStartProcessing } from 'components/DatasetStartProcessing'
import { DatasetSummary } from 'components/DatasetSummary'
import { DownloadDatasetButton } from 'components/DownloadDatasetButton'
import { Error } from 'components/Error'
import { FixedContainer } from 'components/FixedContainer'
import { MoveToDatasetButton } from 'components/MoveToDatasetButton'
import { Row } from 'components/Row'
import { ShareDatasetButton } from 'components/ShareDatasetButton'

export const Dataset = ({ dataset }) => {
  const {
    push,
    query: { start }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const { error, isMyDatasetId } = useDatasetManager()
  const { isNotProcessed } = getDatasetState(dataset)

  useEffect(() => {
    // redirects users to /download if datasetId matches myDatasetId
    if (isMyDatasetId(dataset.id)) push('/download')
  }, [dataset, start])

  if (start) {
    return (
      <FixedContainer>
        <DatasetStartProcessing dataset={dataset} />
      </FixedContainer>
    )
  }

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
      <Box>
        <DatasetPageHeader dataset={dataset} />
        <Row
          border={{ side: 'bottom' }}
          pad={{ bottom: setResponsive('medium', 'small') }}
        >
          <Box>
            <MoveToDatasetButton dataset={dataset} />
          </Box>
          <Row
            gap={setResponsive('medium', 'small')}
            margin={{ top: setResponsive('medium', 'none') }}
          >
            <ShareDatasetButton dataset={dataset} />
            {isNotProcessed && <DownloadDatasetButton dataset={dataset} />}
          </Row>
        </Row>
        <DatasetFileSummaries dataset={dataset} />
        <DatasetSummary dataset={dataset} />
        <DatasetSamples dataset={dataset} isImmutable />
      </Box>
    </FixedContainer>
  )
}

export const getServerSideProps = async ({ query }) => {
  const response = await api.dataset.get(query.datasetId)

  if (response.ok && response) {
    return {
      props: {
        dataset: response
      }
    }
  }

  return { notFound: true }
}

export default Dataset
