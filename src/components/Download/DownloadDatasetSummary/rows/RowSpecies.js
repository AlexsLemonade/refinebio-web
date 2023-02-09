import { formatString } from 'helpers/formatString'
import { TableCell, TableRow, Text } from 'grommet'

export const RowSpieces = ({ samplesBySpecies, experimentCountBySpecies }) => (
  <>
    {Object.keys(samplesBySpecies).map((organism) => (
      <TableRow key={organism}>
        <TableCell>{formatString(organism)}</TableCell>
        <TableCell>
          <Text color="brand">{samplesBySpecies[organism].length}</Text>
        </TableCell>
        <TableCell>
          <Text color="brand">{experimentCountBySpecies[organism] || 0}</Text>
        </TableCell>
      </TableRow>
    ))}
  </>
)

export default RowSpieces
