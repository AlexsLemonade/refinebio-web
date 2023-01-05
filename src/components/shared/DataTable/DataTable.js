import { memo } from 'react'
import {
  Box,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody
} from 'grommet'
import { useTable, useGlobalFilter } from 'react-table'
import { Row } from 'components/shared/Row'
import { GlobalFilter } from 'components/shared/GlobalFilter'

export const DataTable = ({ columns, data }) => {
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter
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
        <Box />
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
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
