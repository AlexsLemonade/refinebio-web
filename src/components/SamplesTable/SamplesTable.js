import { useMemo, memo, useState, useEffect } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { formatString } from 'helpers/formatString'
import { Box, CheckBox } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import {
  DataTable,
  ExpandTableButton,
  GlobalFilter,
  PageSizes,
  Pagination
} from 'components/shared/DataTable'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Overlay } from 'components/shared/Ovevrlay'
import { Row } from 'components/shared/Row'
import { links } from 'config'
import samplesTableMock from 'api/mockDataSamplesTable'
import {
  CellAccessionCode,
  CellAddRemove,
  CellMetadataAnnotations,
  CellProcessingInformation,
  CellSampleMetadata,
  CellTitle
} from './cells'

export const SamplesTable = ({ accessionCode, experiment, samples }) => {
  const { viewport, setResponsive } = useResponsive()
  const minColumns = 5 // same as the current refine.bio
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0 // same as the current refine.bio
  const sampleMetadata = experiment.sample_metadata
  const stickyColumns = 3
  const pageSizes = [10, 20, 50]
  const [tableExpanded, setTableExpanded] = useState(false)
  // for API calls(data, filter, pageSize, limit, offset, order)
  // endpoint: v1/samples/experiment_accession_code=${accessionCode}
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [globalFilter, setGlobalFilter] = useState(null) // match with the react-table useGlobalFilter API's names
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const data = useMemo(() => tableData, [tableData])

  useEffect(() => {
    // TEMPORARY (* only for UI demo)
    setLoading(true)
    // TODO: create helpers for building url query string
    const url = `v1/samples/experiment_accession_code=${accessionCode}&offset=${
      (page - 1) * pageSize
    }&limit=${pageSize}`
    // eslint-disable-next-line no-console
    console.log(url, globalFilter)

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
  }, [globalFilter, page, pageSize, tableData])

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
        accessor: 'title',
        Cell: CellTitle
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
      {tableExpanded && <Overlay duration={0} toggle={tableExpanded} />}
      <Box
        background="white"
        style={{
          animation: tableExpanded ? 'zoomIn .1s ease-in-out forwards' : 'none',
          width: tableExpanded ? '100vw' : '100%',
          height: tableExpanded ? '100vh' : '100%',
          position: tableExpanded ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: tableExpanded ? 5 : 'inherit'
        }}
      >
        <Row
          margin={{ bottom: 'small' }}
          pad={{
            top: tableExpanded ? 'large' : 'none',
            horizontal: tableExpanded ? 'basex6' : 'none'
          }}
        >
          <Box
            align={setResponsive('start', 'start', 'center')}
            direction={setResponsive('column', 'column', 'row')}
            margin={{ bottom: setResponsive('small', 'none') }}
          >
            <PageSizes
              pageSizeLabel="Total Samples"
              pageSize={pageSize}
              pageSizes={pageSizes}
              totalPages={samples.count}
              setPageSize={setPageSize}
            />
            <Box
              margin={{
                left: setResponsive('none', 'none', 'small'),
                top: setResponsive('xsmall', 'xsmall', 'none')
              }}
            >
              <CheckBox label="Show only samples in current dataset" />
            </Box>
          </Box>
          <Box direction="row">
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            {viewport === 'large' && totalColumns > minColumns && (
              <ExpandTableButton
                tableExpanded={tableExpanded}
                setTableExpanded={setTableExpanded}
              />
            )}
          </Box>
        </Row>
        {loading ? null : (
          <TextHighlightContextProvider match={globalFilter}>
            <DataTable
              columns={columns}
              data={data}
              defaultColumn={defaultColumn}
              hiddenColumns={columns
                .filter((column) => column.isVisible === false)
                .map((column) => column.accessor)}
              loading={loading}
              manualPagination
              tableExpanded={tableExpanded}
            />
          </TextHighlightContextProvider>
        )}
        <Row justify="start" margin={{ top: 'small' }}>
          <InlineMessage
            color="info"
            fontSize={setResponsive('small', 'medium')}
            margin={{
              left: tableExpanded ? 'basex6' : 'none',
              right: 'xsmall',
              bottom: setResponsive('xsmall', 'none')
            }}
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
        <Box
          align="center"
          direction="row"
          justify="center"
          margin={{ top: 'medium' }}
        >
          <Pagination
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            totalPages={samples.count}
          />
        </Box>
      </Box>
    </>
  )
}

export default memo(SamplesTable)
