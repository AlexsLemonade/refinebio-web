import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const gray = 'gray-shade-40'
const alternateRowBg = 'gray-shade-5'
const rowHoverBG = '#E2E2E2'

export const DataTableSticky = styled(Box)`
  ${({ theme }) => css`
    border: 1px solid ${theme.global.colors[gray]};

    .tr {
      :last-child {
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
    }
    .th,
    .td {
      background: ${theme.global.colors.white};
      border-bottom: 1px solid ${theme.global.colors[gray]};
      border-right: 1px solid ${theme.global.colors[gray]};
      font-size: 14px;
      overflow: hidden;
      padding: 8px 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    > div {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px ${theme.global.colors[gray]};
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
