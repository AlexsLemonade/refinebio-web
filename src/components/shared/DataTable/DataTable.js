import { useState, memo } from 'react'
import {
  useBlockLayout,
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useResponsive } from 'hooks/useResponsive'
import { Box, CheckBox } from 'grommet'
import { Row } from 'components/shared/Row'
import { DataTableSticky } from './DataTableSticky'
import { GlobalFilter } from './GlobalFilter'
import { SortByIcon } from './SortByIcon'
import { PageSizes } from './PageSizes'

export const DataTable = ({
  columns,
  data,
  fetchedData: experiment,
  pageSizes
}) => {
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const { setResponsive } = useResponsive()
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    useBlockLayout,
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
      <Box border={{ color: 'gray-shade-40', side: 'right' }}>
        <DataTableSticky>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Box {...getTableProps()} style={{ width: '100%' }}>
            <Box role="rowgroup" className="header">
              {headerGroups.map((headerGroup) => (
                // This tr must be a native HTML div tag to prevevnt UI bug
                // eslint-disable-next-line react/jsx-props-no-spreading
                <div {...headerGroup.getHeaderGroupProps()} className="tr">
                  {headerGroup.headers.map((column) => (
                    <Box
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="th"
                    >
                      <Box direction="row" justify="between">
                        {column.render('Header')}
                        {column.canSort && (
                          <SortByIcon
                            isSorted={column.isSorted}
                            isSortedDesc={column.isSortedDesc}
                          />
                        )}
                      </Box>
                    </Box>
                  ))}
                </div>
              ))}
            </Box>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Box {...getTableBodyProps()} className="body">
              {rows.map((row) => {
                prepareRow(row)

                return (
                  // This tr must be a native HTML div tag to prevevnt UI bug
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <div {...row.getRowProps()} className="tr">
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <Box {...cell.getCellProps()} className="td">
                        {cell.render('Cell')}
                      </Box>
                    ))}
                  </div>
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
