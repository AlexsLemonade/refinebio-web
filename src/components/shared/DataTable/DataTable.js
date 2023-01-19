import { useRef, useState, memo } from 'react'
import {
  useFlexLayout,
  useGlobalFilter,
  useResizeColumns,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useIntersectObserver } from 'hooks/useIntersectObserver'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox, Text } from 'grommet'
import { Overlay } from 'components/shared/Ovevrlay'
import { Row } from 'components/shared/Row'
import { DataTableSticky } from './DataTableSticky'
import { ExpandTableButton } from './utils/ExpandTableButton'
import { GlobalFilter } from './utils/GlobalFilter'
import { HorizontalScrollIndicator } from './utils/HorizontalScrollIndicator'
import { PageSizes } from './utils/PageSizes'
import { Pagination } from './utils/Pagination'
import { SortByIcon } from './utils/SortByIcon'

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  hiddenColumns = [],
  label = '',
  loading = false,
  manualPagination = false,
  pageSizes,
  filter, // for GlobalFilter
  setFilters, // for GlobalFilter
  page,
  setPage,
  pageSize,
  setPageSize,
  totalColumns = 0,
  totalPages
}) => {
  const { viewport, setResponsive } = useResponsive()
  const tableRef = useRef(null)
  const firstCellRef = useRef(null)
  const lastCellRef = useRef(null)
  const isFirstCellVisible = useIntersectObserver(firstCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.99
  }).isIntersecting
  const isLastCellVisible = useIntersectObserver(lastCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.99
  }).isIntersecting
  const minColumns = 5 // same as the current refine.bio

  const [tableExpanded, setTableExpanded] = useState(false)

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { hiddenColumns },
      manualPagination
    },
    useGlobalFilter,
    useResizeColumns,
    useFlexLayout,
    useSticky,
    useSortBy
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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? null : (
        <>
          {tableExpanded && <Overlay duration={0} toggle={tableExpanded} />}
          <Box
            background="white"
            style={{
              animation: tableExpanded
                ? 'zoomIn .1s ease-in-out forwards'
                : 'none',
              width: tableExpanded ? '100vw' : '100%',
              height: tableExpanded ? '100vh' : '100%',
              position: tableExpanded ? 'fixed' : 'relative',
              top: 0,
              left: 0,
              zIndex: tableExpanded ? 100 : 'inherit'
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
                  label={label}
                  pageSize={pageSize}
                  pageSizes={pageSizes}
                  totalPages={totalPages}
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
                  {viewport !== 'small' && totalColumns > minColumns && (
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
              margin={{
                horizontal: tableExpanded ? 'basex6' : 'none'
              }}
              style={{ overflow: 'visible' }}
            >
              <DataTableSticky>
                <HorizontalScrollIndicator
                  isFirstCellVisible={isFirstCellVisible}
                  isLastCellVisible={isLastCellVisible}
                  target={tableRef.current}
                />
                <Box
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...getTableProps()}
                  ref={tableRef}
                  style={{ width: '100%' }}
                >
                  <Box className="header" style={{ width: '100%' }}>
                    {headerGroups.map((headerGroup) => (
                      <Box
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...headerGroup.getHeaderGroupProps()}
                        className="tr"
                        direction="row"
                      >
                        {headerGroup.headers.map((column, i, arr) => (
                          <Box
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            className="th"
                            ref={
                              // eslint-disable-next-line no-nested-ternary
                              i === 0
                                ? firstCellRef
                                : i === arr.length - 1
                                ? lastCellRef
                                : null
                            }
                          >
                            <Box direction="row" justify="between">
                              <Text>{column.render('Header')}</Text>
                              {column.canSort && (
                                <SortByIcon
                                  isSorted={column.isSorted}
                                  isSortedDesc={column.isSortedDesc}
                                  margin={{ top: '-2px' }}
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
                            <Box
                              background={
                                column.isSorted
                                  ? 'gray-shade-70'
                                  : 'transparent'
                              }
                              height="3px"
                              width="100%"
                              style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0
                              }}
                            />
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
                    height={{ max: tableExpanded ? '70vh' : '54vh' }}
                  >
                    {rows.map((row) => {
                      prepareRow(row)

                      return (
                        <Box
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...row.getRowProps()}
                          className="tr"
                          direction="row"
                        >
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
            <Pagination
              page={page}
              pageSize={pageSize}
              setPage={setPage}
              totalPages={totalPages}
            />
          </Box>
        </>
      )}
    </>
  )
}

export default memo(DataTable)
