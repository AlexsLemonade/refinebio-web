import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import gtag from 'analytics/gtag'
import { cache, links } from 'config'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/Anchor'
import { Button } from 'components/Button'
import { Column } from 'components/Column'
import { InlineMessage } from 'components/InlineMessage'
import { Row } from 'components/Row'

export const DatasetRegenerateHeader = ({ dataset }) => {
  const { worker_version: workerVersion } = dataset
  const { push } = useRouter()
  const { createDataset, updateDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()

  const handleRegenerateFiles = async () => {
    const params = {
      data: dataset.data,
      aggregate_by: dataset.aggregate_by,
      scale_by: dataset.scale_by,
      quantile_normalize: dataset.quantile_normalize
    }
    const response = await updateDataset(await createDataset(), params)
    const pathname = `/dataset/${response.id}`

    gtag.trackRegeneratedDataset(dataset, response)
    push(
      {
        pathname,
        query: {
          start: true
        }
      },
      pathname
    )
  }

  // returns true if there's a difference between the two minor versions given
  const isMinorVersionChange = (v1, v2) => {
    if (!v1 || !v2) return false
    const regex = /\.\d+\./gm
    const v1Match = v1.match(regex)
    const v2Match = v2.match(regex)
    if (!v1Match || !v2Match) return false
    return v1Match[0] !== v2Match[0]
  }

  return (
    <Box align="center">
      <Row justify="center" width={setResponsive('100%', '70%')}>
        <Column align={setResponsive('center', 'start')}>
          <Heading level={1} margin={{ bottom: 'small' }}>
            Download Expired!
          </Heading>
          <Paragraph>
            The download files for this dataset isn&#39;t available anymore.
          </Paragraph>
          <Box
            margin={{
              top: setResponsive('medium', 'small')
            }}
            width={setResponsive('100%', 'auto')}
          >
            <Button
              label="Regenerate Files"
              primary
              responsive
              onClick={handleRegenerateFiles}
            />
            {isMinorVersionChange(cache.xSourceRevision, workerVersion) && (
              <Box margin={{ top: 'small' }}>
                <InlineMessage
                  label={
                    <>
                      Some expression values may differ.{' '}
                      <Anchor
                        href={links.refinebio_docs_why_expression_values_differ}
                        label="Learn Why"
                        rel="noopener noreferrer"
                      />
                    </>
                  }
                  fontSize="medium"
                  margin={{
                    right: 'xsmall',
                    bottom: setResponsive('xsmall', 'xsmall', 'none')
                  }}
                />
              </Box>
            )}
          </Box>
        </Column>
        <Column
          align="center"
          margin={{
            top: setResponsive('large', 'none'),
            bottom: setResponsive('large', 'none')
          }}
        >
          <Box
            aria-hidden
            background={{
              image: "url('/illustration-download-expired-dataset.svg')",
              position: 'center',
              repeat: 'no-repeat',
              size: 'contain'
            }}
            // to preserve the dimension of SVG image
            height={setResponsive('169px', '169px', '169px')}
            width={setResponsive('250px', '210px')}
          />
        </Column>
      </Row>
    </Box>
  )
}

export default DatasetRegenerateHeader
