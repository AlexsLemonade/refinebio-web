import { useRef, memo } from 'react'
import {
  useFlexLayout,
  useResizeColumns,
  useSortBy,
  useTable
} from 'react-table'
import { useSticky } from 'react-table-sticky'
import { useIntersectObserver } from 'hooks/useIntersectObserver'
import { Box, Text } from 'grommet'
import styled, { css } from 'styled-components'
import {
  HorizontalScrollIndicator,
  Resizer,
  SortBy,
  SortByBorder
} from './utils'

const borderColor = 'gray-shade-20'
const alternateRowBg = 'gray-shade-5'
const rowHoverBG = 'brand-tint-80'
const headerHeight = '44px'

const Table = styled(Box)`
  overflow: scroll;
  position: relative;
  right: -15px;

  [data-sticky-td] {
    position: sticky;
  }
  ${({ theme }) => css`
    [data-sticky-last-left-td] {
      box-shadow: 5px 2px 15px ${theme.global.colors[borderColor]};
    }
    [data-sticky-first-right-td] {
      box-shadow: -2px 0px 3px ${theme.global.colors[borderColor]};
    }
  `}
`

const TableHeader = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 1;
`

const TableBody = styled(Box)`
  position: relative;
  z-index: 0;
`

const TableRow = styled(Box)`
  ${({ theme, type }) => css`
    &:last-child div {
      border-bottom: 0;
    }
    &:nth-child(even) {
      > div {
        background: ${theme.global.colors[alternateRowBg]};
      }
    }
    &:hover div {
      background: ${type !== 'th' && theme.global.colors[rowHoverBG]};
    }
  `}
`

const TableCell = styled(Box)`
  ${({ theme }) => css`
    background: ${theme.global.colors.white};
    border-bottom: 1px solid ${theme.global.colors[borderColor]};
    border-right: 1px solid ${theme.global.colors[borderColor]};
    overflow: hidden;
    padding: 8px 16px;
    position: relative;
    white-space: normal;
    overflow: hidden;
    &:last-child {
      border-right: 0;
    }
    span {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `}

  ${({ theme, type }) =>
    type === 'th' &&
    css`
      box-shadow: 5px 2px 15px ${theme.global.colors[borderColor]};
    `}
`

export const DataTable = ({
  columns,
  data,
  defaultColumn = {},
  hiddenColumns = [],
  manualPagination = false,
  tableExpanded,
  tableDefaultHeight, // required for the TableBody y-scroll
  tableExpandedHeight
}) => {
  const tableRef = useRef(null)
  const firstCellRef = useRef(null)
  const lastCellRef = useRef(null)
  const isFirstCellVisible = useIntersectObserver(firstCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.9
  }).isIntersecting
  const isLastCellVisible = useIntersectObserver(lastCellRef, {
    root: tableRef.current,
    rootMargin: '0px',
    threshold: 0.9
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
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance

  return (
    <Box
      margin={{
        horizontal: tableExpanded ? 'basex6' : 'none'
      }}
      style={{ overflow: 'visible' }}
    >
      <Box
        style={{
          position: 'relative'
        }}
        border={{
          color: 'gray-shade-20',
          side: 'all'
        }}
      >
        <HorizontalScrollIndicator
          isFirstCellVisible={isFirstCellVisible}
          isLastCellVisible={isLastCellVisible}
          target={tableRef.current}
        />
        <Box
          width={{ max: 'none' }}
          style={{
            left: '-15px',
            overflow: 'hidden',
            position: 'relative',
            width: 'calc(100% + 15px)'
          }}
        >
          <Table
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...getTableProps()}
            ref={tableRef}
            style={{ minWidth: 'auto' }}
          >
            <TableHeader className="header" style={{ width: '100%' }}>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...headerGroup.getHeaderGroupProps()}
                  direction="row"
                  type="th"
                >
                  {headerGroup.headers.map((column, i, arr) => (
                    <TableCell
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      type="th"
                      height={headerHeight}
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
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...column.getResizerProps()}
                          isResizing={column.isResizing}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                      <SortByBorder isSorted={column.isSorted} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getTableBodyProps()}
              className="body"
              height={tableExpanded ? tableExpandedHeight : tableDefaultHeight}
            >
              {rows.map((row) => {
                prepareRow(row)

                return (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <TableRow {...row.getRowProps()} direction="row">
                    {row.cells.map((cell) => (
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      <TableCell {...cell.getCellProps()}>
                        <Text>{cell.render('Cell')}</Text>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(DataTable)
