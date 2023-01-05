import { useState, memo } from 'react'
import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import { useResponsive } from 'hooks/useResponsive'
import {
  Box,
  CheckBox,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from 'grommet'
import { Row } from 'components/shared/Row'
import { GlobalFilter } from './GlobalFilter'
import { PageSizes } from './PageSizes'
import { SortByIcon } from './SortByIcon'

export const DataTable = ({ columns, data, experiments, pageSizes }) => {
  const [pageSize, setPageSize] = useState(pageSizes[0])
  const { setResponsive } = useResponsive()
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
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
    <>
      <Row margin={{ bottom: 'small' }}>
        <Box
          align={setResponsive('start', 'start', 'center')}
          direction={setResponsive('column', 'column', 'row')}
          margin={{ bottom: setResponsive('small', 'none') }}
        >
          <PageSizes
            count={experiments.count}
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
      <Box
        border={{ color: 'gray-shade-40', side: 'right' }}
        style={{ overflow: 'hidden' }}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <Row>
                      {column.render('Header')}
                      {column.canSort && (
                        <SortByIcon
                          isSorted={column.isSorted}
                          isSortedDesc={column.isSortedDesc}
                          margin={{ left: 'small' }}
                        />
                      )}
                    </Row>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)

              return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Box>
    </>
  )
}

export default memo(DataTable)
