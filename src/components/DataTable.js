/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { Box, Text } from 'grommet'
import { useIntersectObserver } from 'hooks/useIntersectObserver'
import { BoxBlock } from 'components/BoxBlock'
import { Resizer } from 'components/Resizer'
import { SortBy } from 'components/SortBy'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from 'components/Table'
import { XScrollArrow } from 'components/XScrollArrow'

export const DataTable = ({
  columns: tableColumns,
  data: tableData,
  defaultColumn = {},
  defaultSortId = '',
  hasTableData,
  hiddenColumns = [],
  manualPagination = false,
  tableExpanded,
  tableHeight, // required for the expanded table view
  modalView = false,
  onSortByChange = () => {}
}) => {
  const tableRef = useRef(null)
  const firstCellRef = useRef(null)
  const lastCellRef = useRef(null)
  const isFirstCellVisible = useIntersectObserver(firstCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.99
  })
  const isLastCellVisible = useIntersectObserver(lastCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.8
  })
  const columns = useMemo(() => tableColumns, [tableColumns])
  const data = useMemo(() => tableData, [tableData])
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns,
        sortBy: [
          {
            id: defaultSortId,
            desc: false
          }
        ]
      },
      manualPagination,
      autoResetSortBy: false
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
      columnResizing: { columnWidths },
      sortBy
    }
  } = tableInstance
  const [cellWidths, setCellWidths] = useState({})

  useEffect(() => {
    if (columnWidths) {
      setCellWidths((prev) => ({ ...prev, columnWidths }))
    }
  }, [columnWidths])

  useEffect(() => {
    onSortByChange(
      sortBy.length > 0
        ? sortBy[0].desc
          ? `-${sortBy[0].id}`
          : sortBy[0].id
        : ''
    )
  }, [sortBy])

  return (
    <Box
      border={{
        color: 'gray-shade-20',
        side: 'all'
      }}
      height={{ min: hasTableData ? 'auto' : '160px' }}
      margin={{
        horizontal: tableExpanded ? 'basex6' : 'none'
      }}
      style={{ overflow: 'visible' }}
    >
      <BoxBlock>
        <XScrollArrow
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
            height={{ max: tableHeight || modalView ? '60vh' : 'auto' }}
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
