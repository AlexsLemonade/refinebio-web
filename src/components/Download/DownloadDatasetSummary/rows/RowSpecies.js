import { TableCell, TableRow, Text } from 'grommet'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'

export const RowSpieces = ({
  samplesBySpecies = [],
  experimentCountBySpecies = []
}) => (
  <>
    {Object.keys(samplesBySpecies).map((organism) => (
      <TableRow key={organism}>
        <TableCell>{formatString(organism)}</TableCell>
        <TableCell>
          <Text color="brand">
            {formatNumbers(samplesBySpecies[organism]?.length)}
          </Text>
        </TableCell>
        <TableCell>
          <Text color="brand">
            {formatNumbers(experimentCountBySpecies[organism]) || 0}
          </Text>
        </TableCell>
      </TableRow>
    ))}
  </>
)

export default RowSpieces
