import { nanoid } from 'nanoid'
import { TableCell, TableRow, Text } from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import formatNumbers from 'helpers/formatNumbers'

export const TotalRow = ({ dataset }) => {
  const { getTotalExperiments, getTotalSamples } = useDatasetManager()
  const totals = [
    getTotalSamples(dataset.data),
    getTotalExperiments(dataset.data)
  ]

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

export default TotalRow
