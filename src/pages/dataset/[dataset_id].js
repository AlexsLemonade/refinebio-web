import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { api } from 'api'
import getDatasetState from 'helpers/getDatasetState'
import { Error } from 'components/shared/Error'
import { FixedContainer } from 'components/shared/FixedContainer'
import { Row } from 'components/shared/Row'
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

export const Dataset = ({ dataset }) => {
  const {
    push,
    query: { start }
  } = useRouter()
  const { setResponsive } = useResponsive()
  const { error, isMyDatasetId } = useDatasetManager()
  const { isNotProcessed } = getDatasetState(dataset)

  useEffect(() => {
    // redirects users to /download if datasetId matches My dataset ID
    if (isMyDatasetId(dataset.id)) push('/download')
  }, [dataset, start])

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
