import { useMemo, memo, useState, useEffect } from 'react'
import { useResponsive } from 'hooks/useResponsive'
import { TextHighlightContextProvider } from 'contexts/TextHighlightContext'
import formatString from 'helpers/formatString'
import makeURLParams from 'helpers/makeURLParams'
import { Box, CheckBox, Spinner } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
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
import { links, options } from 'config'
import { getSamplesTableData, getSamplesByOrganismName } from 'api/mockHelper'
import { api } from 'api'
import {
  CellAccessionCode,
  CellAddRemove,
  CellAdditionalMetadata,
  CellProcessingInformation,
  CellSampleMetadata,
  CellTitle
} from './cells'

export const SamplesTable = ({
  experimentSampleAssociations,
  queryToAdd,
  sampleMetadataFields,
  isImmutable = false,
  modalView = false
}) => {
  const { pageSizes } = options
  const { viewport, setResponsive } = useResponsive()
  const tableHeight = tableExpanded ? '75vh' : '800px' // required for the table height on expanded view
  const minColumns = 5 // matches the current refine.bio
  const [tableExpanded, setTableExpanded] = useState(false)
  // TEMPORARY
  // for API calls(data, filter, pageSize, limit, offset, order)
  // endpoint: v1/samples/
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null) // match the react-table useGlobalFilter API's names
  const [page, setPage] = useState(0) // 'page' matches the react-table usePagination API's name
  const [pageSize, setPageSize] = useState(pageSizes[0]) // match the react-table usePagination API's names
  const defaultParams = { offset: page * pageSize, limit: pageSize }
  const totalPages = tableData && tableData.count
  const totalColumns =
    tableData && sampleMetadataFields ? 4 + sampleMetadataFields.length : 0 // matches the current refine.bio
  const data = useMemo(() => tableData.results, [tableData])
  const columns = useMemo(() => {
    const temp = [
      {
        Header: 'Add/Remove',
        // eslint-disable-next-line react/no-unstable-nested-components
        Cell: ({ row: { original: sample } }) => (
          <CellAddRemove
            experimentAccessionCodes={Object.keys(
              experimentSampleAssociations
            ).filter((accessionCode) =>
              experimentSampleAssociations[accessionCode].includes(
                sample.accession_code
              )
            )}
            sample={sample}
          />
        ),
        disableSortBy: true,
        id: 'add_remove',
        width: 200,
        maxWidth: 200
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
      // maps the available columns in the experiment.sample_metadata
      ...sampleMetadataFields.map((column) => ({
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
        Cell: CellAdditionalMetadata
      }
    ]
    // makes columns stick to left only for 'large' (enough screen real estate)
    if (viewport === 'large') {
      let stickyColumns = 3
      let i = 0
      // removes the add/remove button if the dataset is immutable
      if (isImmutable) {
        temp.shift()
        stickyColumns = 2
      }
      for (i; i <= stickyColumns; i++) {
        temp[i].sticky = 'left'
      }
    }

    return temp
  }, [isImmutable, viewport])
  const defaultColumn = useMemo(
    () => ({ minWidth: 60, width: 160, maxWidth: 250 }),
    []
  )

  useEffect(() => {
    // TEMPORARY (* for UI demo)
    setLoading(true)

    let url
    let formattedParams

    const getSamples = async (params) => {
      setLoading(true)
      const result = await api.samples.list(params)
      setTableData(result)
      setLoading(false)
    }

    if (queryToAdd.dataset_id) {
      formattedParams = makeURLParams(queryToAdd)
      if (queryToAdd.organism__name) {
        url = `v1/samples/?${formattedParams}&offset=${
          page * pageSize
        }&limit=${pageSize}`
        // eslint-disable-next-line no-console
        console.log(url)
        getSamplesByOrganismName(queryToAdd.organism__name, setTableData)
      }

      if (queryToAdd.experiment_accession_code) {
        if (queryToAdd.experiment_accession_code) {
          url = `v1/samples/?${formattedParams}&offset=${
            page * pageSize
          }&limit=${pageSize}`
          // eslint-disable-next-line no-console
          console.log(url)
          getSamplesTableData(
            queryToAdd.experiment_accession_code,
            pageSize,
            setTableData
          )
        }
      }
      setLoading(false)
    } else {
      getSamples({ ...queryToAdd, ...defaultParams })
    }
  }, [globalFilter, page, pageSize])

  return (
    <>
      {tableExpanded && <Overlay duration={0} toggle={tableExpanded} />}
      <Box
        animation={tableExpanded ? { type: 'zoomIn', duration: 250 } : {}}
        background="white"
        style={{
          width: tableExpanded ? '100vw' : '100%',
          height: tableExpanded ? '100vh' : '100%',
          position: tableExpanded ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          zIndex: tableExpanded ? 10 : 'inherit'
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
              pageSize={pageSize}
              pageSizes={pageSizes}
              totalPages={totalPages}
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
            {!modalView &&
              viewport === 'large' &&
              totalColumns > minColumns && (
                <ExpandTableButton
                  tableExpanded={tableExpanded}
                  setTableExpanded={setTableExpanded}
                />
              )}
          </Box>
        </Row>
        <Box height={tableHeight} style={{ position: 'relative' }}>
          {loading ? (
            <Box align="center" fill justify="center">
              <Spinner
                color="gray-shade-70"
                message={{ start: 'Loading data', end: 'Data loaded' }}
              />
            </Box>
          ) : (
            <TextHighlightContextProvider match={globalFilter}>
              {tableData?.results?.length && (
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
                  tableHeight={tableHeight}
                />
              )}
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
            totalPages={totalPages}
          />
        </Box>
      </Box>
    </>
  )
}

export default memo(SamplesTable)
