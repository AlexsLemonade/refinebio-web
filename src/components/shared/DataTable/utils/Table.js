import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const borderColor = 'gray-shade-20'
const alternateRowBg = 'gray-shade-5'
const rowHoverBG = '#E2E2E2'

const Table = styled(Box)`
  display: block;
  min-width: auto;
  overflow: auto;
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
  width: 100%;
  z-index: 1;
`

const TableBody = styled(Box)`
  position: relative;
  z-index: 0;
`

const TableRow = styled(Box)`
  flex-direction: row;

  ${({ theme }) => css`
    &:last-child div {
      border-bottom: 0;
    }
    &:nth-child(even) {
      > div {
        background: ${theme.global.colors[alternateRowBg]};
      }
      &:hover div {
        background: ${rowHoverBG};
      }
    }
  `}
`

const TableCell = styled(Box)`
  overflow: hidden;
  padding: 8px 16px;
  position: relative;
  overflow: hidden;
  &:last-child {
    border-right: 0;
  }
  span {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${({ theme }) => css`
    background: ${theme.global.colors.white};
    border-bottom: 1px solid ${theme.global.colors[borderColor]};
    border-right: 1px solid ${theme.global.colors[borderColor]};
  `}

  ${({ theme, type }) =>
    type === 'th' &&
    css`
      border-bottom: 1px solid ${theme.global.colors[borderColor]}!important;
      box-shadow: 5px 2px 15px ${theme.global.colors[borderColor]};
      height: 44px;
    `}
`

export { Table, TableBody, TableCell, TableHeader, TableRow }
