import { useState, memo } from 'react'
import {
  useFlexLayout,
  useGlobalFilter,
  useResizeColumns,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Text } from 'grommet'
import { LayerSimple } from 'components/shared/LayerSimple'
import { Row } from 'components/shared/Row'
import { DataTableSticky } from './DataTableSticky'
import { ExpandTableButton } from './ExpandTableButton'
import { GlobalFilter } from './GlobalFilter'
import { PageSizes } from './PageSizes'
import { SortByIcon } from './SortByIcon'

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  original: samples,
  pageSizes,
  hiddenColumns,
  totalColumns = 0
}) => {
  const { viewport, setResponsive } = useResponsive()
  const columnMinCount = 5
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const [tableExpanded, setTableExpanded] = useState(false)

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { hiddenColumns }
    },
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    useSticky
  )
  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter
  } = tableInstance

  return (
    <LayerSimple
      animation={{
        type: ['fadeIn', 'zoomIn'],
        duration: 2000
      }}
      full
      modal
      position="center"
      show={tableExpanded}
    >
      <Row
        margin={{ bottom: 'small' }}
        pad={{
          top: tableExpanded
            ? setResponsive('none', 'medium', 'large')
            : 'none',
          horizontal: tableExpanded
            ? setResponsive('none', 'medium', 'large')
            : 'none'
        }}
      >
        <Box
          align={setResponsive('start', 'start', 'center')}
          direction={setResponsive('column', 'column', 'row')}
          margin={{ bottom: setResponsive('small', 'none') }}
        >
          <PageSizes
            count={samples.count}
            pageSize={pageSize}
            pageSizes={pageSizes}
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
        <Box
          alignSelf={setResponsive('start', 'end', 'start')}
          width={setResponsive('100%', 'auto')}
        >
          <Box direction="row">
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            {viewport !== 'small' && totalColumns > columnMinCount && (
              <ExpandTableButton
                tableExpanded={tableExpanded}
                setTableExpanded={setTableExpanded}
              />
            )}
          </Box>
        </Box>
      </Row>
      <Box
        border={{
          color: 'gray-shade-20',
          side: 'all'
        }}
        height={{ max: '75%' }}
        margin={{
          horizontal: tableExpanded
            ? setResponsive('none', 'medium', 'large')
            : 'none'
        }}
        style={{ overflowY: 'auto' }}
      >
        <DataTableSticky>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Box {...getTableProps()} style={{ width: '100%' }}>
            <Box className="header" style={{ width: '100%' }}>
              {headerGroups.map((headerGroup) => (
                <Box
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...headerGroup.getHeaderGroupProps()}
                  className="tr"
                  direction="row"
                >
                  {headerGroup.headers.map((column) => (
                    <Box
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="th"
                    >
                      <Box direction="row" justify="between">
                        <Text>{column.render('Header')}</Text>
                        {column.canSort && (
                          <SortByIcon
                            isSorted={column.isSorted}
                            isSortedDesc={column.isSortedDesc}
                          />
                        )}
                      </Box>
                      {column.canResize && (
                        <Box
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...column.getResizerProps()}
                          className={`resizer ${
                            column.isResizing ? 'isResizing' : ''
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>

            <Box
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getTableBodyProps()}
              className="body"
              width="100%"
            >
              {rows.map((row) => {
                prepareRow(row)

                return (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Box {...row.getRowProps()} className="tr" direction="row">
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <Box {...cell.getCellProps()} className="td">
                        <Text>{cell.render('Cell')}</Text>
                      </Box>
                    ))}
                  </Box>
                )
              })}
            </Box>
          </Box>
        </DataTableSticky>
      </Box>
    </LayerSimple>
  )
}

export default memo(DataTable)
