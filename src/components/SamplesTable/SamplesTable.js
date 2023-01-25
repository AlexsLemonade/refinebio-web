import { useMemo, memo, useState, useEffect } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import { formatString } from 'helpers/formatString'
import { Box, CheckBox, Heading, Spinner } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { Column } from 'components/shared/Column'
import {
  DataTable,
  ExpandTableButton,
  GlobalFilter
} from 'components/shared/DataTable'
import { InlineMessage } from 'components/shared/InlineMessage'
import { Overlay } from 'components/shared/Ovevrlay'
import { PageSizes } from 'components/shared/PageSizes'
import { Pagination } from 'components/shared/Pagination'
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
import { SamplesTableCTA } from './SamplesTableCTA'

export const SamplesTable = ({ accessionCode, experiment, samples }) => {
  const { viewport, setResponsive } = useResponsive()
  const tableHeight = { default: '60vh', expanded: '75vh' } // required for a table loading screen
  const minColumns = 5 // matches the current refine.bio
  const totalColumns = experiment ? 4 + experiment.sample_metadata.length : 0 // matches the current refine.bio
  const stickyColumns = 3
  const pageSizes = [10, 20, 50]
  const sampleMetadata = experiment.sample_metadata
  const [tableExpanded, setTableExpanded] = useState(false)
  // TEMPORARY
  // for API calls(data, filter, pageSize, limit, offset, order)
  // endpoint: `v1/samples/experiment_accession_code=${accessionCode}`
  const isFirst = accessionCode === 'GSE116436'
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null) // match the react-table useGlobalFilter API's names
  const [page, setPage] = useState(0) // 'page' matches the react-table usePagination API's name
  const [pageSize, setPageSize] = useState(pageSizes[0]) // match the react-table usePagination API's names

  const data = useMemo(() => tableData, [tableData])
  const columns = useMemo(() => {
    const temp = [
      {
        Header: 'Add/Remove',
        Cell: CellAddRemove,
        disableSortBy: true,
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
        disableSortBy: true,
        id: 'processing_information',
        width: 180,
        Cell: CellProcessingInformation
      },
      {
        Header: 'Additional Metadata',
        disableSortBy: true,
        id: 'additional_metadata',
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

  // TEMPORARY (* for UI demo)
  useEffect(() => {
    setLoading(true)
    // TODO: create helpers for building a url query string
    const url = `v1/samples/experiment_accession_code=${accessionCode}&offset=${
      page * pageSize
    }&limit=${pageSize}`
    // eslint-disable-next-line no-console
    console.log(url)

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
  }, [globalFilter, page, pageSize])

  return (
    <Box
      elevation="medium"
      pad={setResponsive('medium', 'large')}
      margin={{ bottom: 'basex6' }}
    >
      <Row margin={{ bottom: 'medium' }}>
        <Column>
          <Heading
            level={2}
            size="h2_small"
            margin={{ bottom: setResponsive('small', 'none') }}
          >
            Samples
          </Heading>
        </Column>
        <Column>
          <SamplesTableCTA />
        </Column>
      </Row>
      {tableExpanded && <Overlay duration={0} toggle={tableExpanded} />}
      <Box
        animation={tableExpanded ? { type: 'zoomIn', duration: 500 } : {}}
        background="white"
        style={{
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
            margin={{ bottom: setResponsive('medium', 'none') }}
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
                left: setResponsive('none', 'none', 'medium'),
                top: setResponsive('small', 'xsmall', 'none')
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
        <Box
          height={tableExpanded ? tableHeight.expanded : tableHeight.default}
          style={{ position: 'relative' }}
        >
          {loading ? (
            <Box align="center" fill justify="center">
              <Spinner
                color="gray-shade-70"
                message={{ start: 'Loading data', end: 'Data loaded' }}
              />
            </Box>
          ) : (
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
                tableDefaultHeight={tableHeight.default}
                tableExpandedHeight={tableHeight.expanded}
                tableExpanded={tableExpanded}
              />
            </TextHighlightContextProvider>
          )}
        </Box>
        <Box
          direction={setResponsive('column', 'row')}
          justify="start"
          margin={{ top: 'small' }}
        >
          <InlineMessage
            color="info"
            fontSize="medium"
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
            target="_blank"
          />
        </Box>
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
    </Box>
  )
}

export default memo(SamplesTable)
