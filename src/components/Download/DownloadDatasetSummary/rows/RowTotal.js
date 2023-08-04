import { nanoid } from 'nanoid'
import { TableCell, TableRow, Text } from 'grommet'
import formatNumbers from 'helpers/formatNumbers'

export const RowTotal = ({ totals = [] }) => {
  return (
    <TableRow>
      <TableCell>Total</TableCell>
      {totals.map((total) => (
        <TableCell key={nanoid()}>
          <Text color="brand">{formatNumbers(total)}</Text>
        </TableCell>
      ))}
    </TableRow>
  )
}

export default RowTotal
