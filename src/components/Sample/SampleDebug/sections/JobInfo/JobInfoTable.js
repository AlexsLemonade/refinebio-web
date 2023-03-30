import {
  TableBody as GrommetTableBody,
  TableCell as GrommetTableCell,
  TableHeader as GrommetTableHeader,
  TableRow as GrommetTableRow
} from 'grommet'
import styled, { css } from 'styled-components'

export const TableBody = styled(GrommetTableBody)`
  padding: 16px;
  td {
    text-align: left;
  }
`

export const TableCell = styled(GrommetTableCell)`
  padding: 16px;
`

export const TableHeader = styled(GrommetTableHeader)`
  th {
    text-align: left;
    font-weight: bold;
  }
`

export const TableRow = styled(GrommetTableRow)`
  border: none !important;
  &:hover td {
    background: none !important;
  }
  ${({ theme, color }) => css`
    color: ${theme.global.colors[color]};
  `}
  ${({ selected }) =>
    selected &&
    css`
      font-weight: bold;
    `}
`
