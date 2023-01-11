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
import { SortBy } from './utils/SortBy'

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  original: samples,
  pageSizes,
  hiddenColumns,
  totalColumns = 0
}) => {
  const tableRef = useRef(null)
  const lastCellRef = useRef(null)
  const { viewport, setResponsive } = useResponsive()
  const nodes = useIntersectObserver(
    {
      root: tableRef.current,
      rootMargin: '0px',
      threshold: 1.0
    },
    lastCellRef
  )
  const isHorizontalScroll = nodes.node_0?.isIntersecting
  const columnMinCount = 5 // same as the current refine.bio
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

  const handleScroll = (value) => {
    tableRef.current.scrollBy({
      top: 0,
      left: value,
      behavior: 'smooth'
    })
  }

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
          margin={{
            horizontal: tableExpanded ? 'basex6' : 'none'
          }}
          style={{ overflow: 'visible' }}
        >
          <DataTableSticky>
            <HorizontalScrollIndicator
              isIntersecting={isHorizontalScroll}
              handleScroll={handleScroll}
            />
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Box {...getTableProps()} ref={tableRef} style={{ width: '100%' }}>
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
                        ref={i === arr.length - 1 ? lastCellRef : null}
                      >
                        <Box direction="row" justify="between">
                          <Text>{column.render('Header')}</Text>
                          {column.canSort && (
                            <SortBy
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
                height={tableExpanded ? '70vh' : '50vh'}
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
      </Box>
    </>
  )
}

export default memo(DataTable)
