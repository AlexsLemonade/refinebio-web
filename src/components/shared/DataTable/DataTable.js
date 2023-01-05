import { memo } from 'react'
import { Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet'
import { useTable } from 'react-table'

export const DataTable = ({ columns, data }) => {
  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
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
  )
}

export default memo(DataTable)
