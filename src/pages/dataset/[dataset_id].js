import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { usePollDatasetStatus } from 'hooks/usePollDatasetStatus'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import getDatasetState from 'helpers/getDatasetState'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
import { Spinner } from 'components/shared/Spinner'
import {
  DatasetPageHeader,
  MoveToDatasetButton,
  ShareDatasetButton
} from 'components/Dataset'
import {
  DatasetDetails,
  DatasetSummary,
  DownloadDatasetButton,
  FilesSummary,
  StartProcessing
} from 'components/Download'

export const Dataset = ({ dataset: datasetProps }) => {
  const {
    push,
    query: { start }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const { error, isMyDatasetId } = useDatasetManager()
  const { isProcessingDataset, polledDatasetState } = usePollDatasetStatus(
    datasetProps.id
  )
  const [dataset, setDataset] = useState(datasetProps) // dataset currently displayed on the page
  const { isNotProcessed } = getDatasetState(datasetProps)

  useEffect(() => {
    // redirects users to /download if datasetId matches My dataset ID
    if (isMyDatasetId(dataset.id)) push('/download')
  }, [dataset, start])

  useEffect(() => {
    // update the dataset with the latest polledDatasetState
    // once processing is complate to re-render DatasetPageHeader
    if (!isProcessingDataset && polledDatasetState) {
      setDataset(polledDatasetState)
    }
  }, [isProcessingDataset, polledDatasetState])

  if (start) {
    return (
      <FixedContainer>
        <StartProcessing dataset={dataset} />
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

  if (!dataset.data) return <Spinner />

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
        <FilesSummary dataset={dataset} />
        <DatasetSummary dataset={dataset} />
        <DatasetDetails dataset={dataset} isImmutable />
      </Box>
    </FixedContainer>
  )
}

export const getServerSideProps = async ({ query }) => {
  const response = await api.dataset.get(query.dataset_id)

  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      dataset: response
    }
  }
}

export default Dataset
