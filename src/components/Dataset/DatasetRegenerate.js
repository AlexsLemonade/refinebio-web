import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Paragraph } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Anchor } from 'components/shared/Anchor'
import { Button } from 'components/shared/Button'
import { Column } from 'components/shared/Column'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { cache, links } from 'config'

export const DatasetRegenerate = () => {
  const {
    query: { dataset_id: idFromQuery },
    push
  } = useRouter()
  const { createDataset, getDataset, updateDataset } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const [selectedDataset, setSelectedDataset] = useState({})

  const handleRegenerateFiles = async () => {
    const params = {
      data: selectedDataset.data,
      aggregate_by: selectedDataset.aggregate_by,
      scale_by: selectedDataset.scale_by,
      quantile_normalize: selectedDataset.quantile_normalize
    }
    const response = await updateDataset(await createDataset(), params)
    const pathname = `/dataset/${response.id}`

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

  useEffect(() => {
    const getSelectedDataset = async (id) => {
      const response = await getDataset(id)
      setSelectedDataset(response)
      return response
    }

    getSelectedDataset(idFromQuery)
  }, [idFromQuery])

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
            {isMinorVersionChange(
              cache.xSourceRevision,
              selectedDataset?.worker_version
            ) && (
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

export default DatasetRegenerate
