import { useMemo, memo, useState, useEffect } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { formatString } from 'helpers/formatString'
import { Anchor } from 'components/shared/Anchor'
import { DataTable } from 'components/shared/DataTable'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import samplesTableMock from 'api/mockDataSamplesTable'
import { CellAccessionCode } from './cells/CellAccessionCode'
import { CellAddRemove } from './cells/CellAddRemove'
import { CellMetadataAnnotations } from './cells/CellMetadataAnnotations'
import { CellProcessingInformation } from './cells/CellProcessingInformation'
import { CellSampleMetadata } from './cells/CellSampleMetadata'

export const SamplesTable = ({ accessionCode, experiment, samples }) => {
  const { viewport, setResponsive } = useResponsive()
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0 // same as the current refine.bio
  const sampleMetadata = experiment.sample_metadata
  const stickyColumns = 3
  const pageSizes = [10, 20, 50]
  // for API calls(data, filter, pageSize, limit, offset, order)
  // endpoint: v1/samples/experiment_accession_code=${accessionCode}
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const data = useMemo(() => tableData, [tableData])

  useEffect(() => {
    // TEMPORARY (for UI demo)
    setLoading(true)
    // eslint-disable-next-line no-console
    console.log(
      `v1/samples/experiment_accession_code=${accessionCode}&offset=${
        (page - 1) * pageSize
      }&limit=${pageSize}`
    )
    const isFirst = accessionCode === 'GSE116436'

    if (pageSize === pageSizes[0]) {
      setTableData(
        isFirst
          ? samplesTableMock[0][0].results
          : samplesTableMock[1][0].results
      )
    } else if (pageSize === pageSizes[1]) {
      setTableData(
        isFirst
          ? samplesTableMock[0][1].results
          : samplesTableMock[1][1].results
      )
    } else if (pageSize === pageSizes[2]) {
      setTableData(
        isFirst
          ? samplesTableMock[0][2].results
          : samplesTableMock[1][2].results
      )
    }
    setLoading(false)
  }, [filter, page, pageSize, tableData])

  const columns = useMemo(() => {
    const temp = [
      {
        Header: 'Add/Remove',
        Cell: CellAddRemove,
        id: 'add_remove',
        maxWidth: 160
      },
      {
        Header: 'Accession Code',
        accessor: 'accession_code',
        Cell: CellAccessionCode,
        maxWidth: 160
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        id: 'id',
        accessor: 'id',
        isVisible: false
      },
      // map the available columns in the experiment.sample_metadata
      ...sampleMetadata.map((column) => ({
        id: column,
        accessor: column,
        Header: formatString(column),
        Cell: CellSampleMetadata
      })),
      {
        Header: 'Processing Information',
        id: 'processing_information',
        sortable: false,
        width: 180,
        Cell: CellProcessingInformation
      },
      {
        Header: 'Additional Metadata',
        id: 'additional_metadata',
        sortable: false,
        width: 180,
        Cell: CellMetadataAnnotations
      }
    ]
    // columns stick to left only for large(enough screen real estate)
    if (viewport === 'large') {
      for (let i = 0; i <= stickyColumns; i++) {
        temp[i].sticky = 'left'
      }
    }

    return temp
  }, [viewport, experiment])

  const defaultColumn = useMemo(
    () => ({ minWidth: 60, width: 160, maxWidth: 250 }),
    []
  )

  return (
    <>
      {loading ? null : (
        <DataTable
          columns={columns}
          data={data}
          defaultColumn={defaultColumn}
          hiddenColumns={columns
            .filter((column) => column.isVisible === false)
            .map((column) => column.accessor)}
          label="Samples"
          loading={loading}
          manualPagination
          totalColumns={totalColumns}
          totalPages={samples.count}
          filter={filter}
          setFilter={setFilter}
          page={page}
          setPage={setPage}
          pageSizes={pageSizes}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
      <Row justify="start" margin={{ top: 'small' }}>
        <InlineMessage
          color="info"
          fontSize={setResponsive('small', 'medium')}
          margin={{ right: 'xsmall', bottom: setResponsive('xsmall', 'none') }}
          label="Some fields may be harmonized."
          name="Info"
        />
        <Anchor
          href={links.refinebio_docs_harmonized_metadata}
          label="Learn More"
          rel="noopener noreferrer"
          size={setResponsive('small', 'medium')}
          target="_blank"
        />
      </Row>
    </>
  )
}

export default memo(SamplesTable)
