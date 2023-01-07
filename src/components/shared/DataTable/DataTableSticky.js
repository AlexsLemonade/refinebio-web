import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const gray = 'gray-shade-20'
const alternateRowBg = 'gray-shade-5'
const rowHoverBG = '#E2E2E2'

export const DataTableSticky = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.global.colors[gray]};
    display: inline-block;

    .tr {
      &:last-child {
        .td {
          border-bottom: 0;
        }
      }
      &:nth-child(even) {
        .td {
          background: ${theme.global.colors[alternateRowBg]};
        }
      }
      &:hover .td {
        background: ${rowHoverBG};
      }
    }

    .th {
      font-weight: bold;
      box-shadow: none;
    }
    .th,
    .td {
      background: ${theme.global.colors.white};
      border-bottom: 1px solid ${theme.global.colors[gray]};
      border-right: 1px solid ${theme.global.colors[gray]};
      font-size: 14px;
      overflow: hidden;
      padding: 8px 16px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;

      &:last-child {
        border-right: 0;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .resizer {
        box-shadow: none;
        display: inline-block;
        width: 8px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
        &.isResizing {
          background: ${rowHoverBG};
        }
      }
    }

    > div {
      overflow: scroll;
      .header {
        position: sticky;
        width: fit-content;
        z-index: 1;
      }

      .header {
        top: 0;
        box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px ${theme.global.colors[gray]};
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px ${theme.global.colors[gray]};
      }
    }
  `}
`

export default DataTableSticky
