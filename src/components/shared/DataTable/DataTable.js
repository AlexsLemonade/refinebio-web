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
import { Row } from 'components/shared/Row'
import { DataTableSticky } from './DataTableSticky'
import { GlobalFilter } from './GlobalFilter'
import { SortByIcon } from './SortByIcon'
import { PageSizes } from './PageSizes'

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  original: experiment,
  pageSizes
}) => {
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const { setResponsive } = useResponsive()
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn
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
    <>
      <Row margin={{ bottom: 'small' }}>
        <Box
          align={setResponsive('start', 'start', 'center')}
          direction={setResponsive('column', 'column', 'row')}
          margin={{ bottom: setResponsive('small', 'none') }}
        >
          <PageSizes
            count={experiment.count}
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
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </Box>
      </Row>
      <Box border={{ color: 'gray-shade-20', side: 'right' }}>
        <DataTableSticky>
          <Box
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getTableProps()}
            style={{ width: '100%' }}
          >
            <Box className="header" role="rowgroup" style={{ width: '100%' }}>
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Box {...getTableBodyProps()} className="body" width="100%">
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
    </>
  )
}

export default memo(DataTable)
