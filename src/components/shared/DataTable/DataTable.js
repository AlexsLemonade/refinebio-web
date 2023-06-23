/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, useRef, memo } from 'react'
import {
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useIntersectObserver } from 'hooks/useIntersectObserver'
import { Box, Text } from 'grommet'
import { BoxBlock } from 'components/shared/BoxBlock'
import {
  HorizontalScrollIndicator,
  Resizer,
  SortBy,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from './utils'

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  hiddenColumns = [],
  manualPagination = false,
  tableExpanded,
  tableHeight // required for the expanded table view
}) => {
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
    threshold: 0.8
  }).isIntersecting

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { hiddenColumns },
      manualPagination
    },
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
    state: {
      columnResizing: { columnWidths }
    }
  } = tableInstance
  const [cellWidths, setCellWidths] = useState({})

  useEffect(() => {
    if (columnWidths) {
      setCellWidths((prev) => ({ ...prev, columnWidths }))
    }
  }, [columnWidths])

  return (
    <Box
      border={{
        color: 'gray-shade-20',
        side: 'all'
      }}
      height={{ min: '160px' }}
      margin={{
        horizontal: tableExpanded ? 'basex6' : 'none'
      }}
      style={{ overflow: 'visible' }}
    >
      <BoxBlock>
        <HorizontalScrollIndicator
          isFirstCellVisible={isFirstCellVisible}
          isLastCellVisible={isLastCellVisible}
          target={tableRef.current}
        />
        <BoxBlock
          width={{ max: 'none' }}
          style={{
            left: '-15px',
            overflow: 'hidden',
            width: 'calc(100% + 15px)'
          }}
        >
          <Table
            {...getTableProps()}
            ref={tableRef}
            height={{ max: tableHeight }}
          >
            <TableHeader className="header">
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i, arr) => (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      type="th"
                      ref={
                        i === 0
                          ? firstCellRef
                          : i === arr.length - 1
                          ? lastCellRef
                          : null
                      }
                    >
                      <Box direction="row" justify="between">
                        <Text weight="bold">{column.render('Header')}</Text>
                        {column.canSort && (
                          <SortBy
                            isSorted={column.isSorted}
                            isSortedDesc={column.isSortedDesc}
                          />
                        )}
                      </Box>
                      {column.canResize && (
                        <Resizer
                          {...column.getResizerProps()}
                          isResizing={column.isResizing}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody {...getTableBodyProps()} className="body">
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell {...cell.getCellProps()}>
                        <Text
                          style={{
                            whiteSpace:
                              cellWidths &&
                              cellWidths.columnWidths?.cell?.column?.id < 100
                                ? 'nowrap'
                                : 'normal'
                          }}
                        >
                          {cell.render('Cell')}
                        </Text>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </BoxBlock>
      </BoxBlock>
    </Box>
  )
}

export default memo(DataTable)
