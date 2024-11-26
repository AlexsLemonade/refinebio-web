import { TableCell, TableRow, Text } from 'grommet'
import getArrayCounts from 'helpers/getArrayCounts'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'

export const SpiecesRow = ({ dataset }) => {
  const { experiments, organism_samples: organismSamples } = dataset
  const experimentCountByOrganism = getArrayCounts(
    experiments.map((e) => e.organism_names).flat()
  )

  return (
    <>
      {Object.keys(organismSamples).map((organism) => (
        <TableRow key={organism}>
          <TableCell>{formatString(organism)}</TableCell>
          <TableCell>
            <Text color="brand">
              {formatNumbers(organismSamples[organism]?.length)}
            </Text>
          </TableCell>
          <TableCell>
            <Text color="brand">
              {formatNumbers(experimentCountByOrganism[organism]) || 0}
            </Text>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
export default SpiecesRow
