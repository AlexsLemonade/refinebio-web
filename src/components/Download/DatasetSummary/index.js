import { useMemo } from 'react'
import {
  Box,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text
} from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import getArrayCounts from 'helpers/getArrayCounts'
import formatNumbers from 'helpers/formatNumbers'
import formatString from 'helpers/formatString'
import { Row } from 'components/shared/Row'
import { TotalRow } from './TotalRow'

export const DatasetSummary = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const { experiments, organism_samples: organismSamples } = dataset
  const experimentCountByOrganism = useMemo(
    () => getArrayCounts(experiments.map((e) => e.organism_names).flat()),
    [experiments]
  )

  return (
    <Box margin={{ top: 'large' }}>
      <Heading level={2} margin={{ bottom: 'small' }}>
        Dataset Summary
      </Heading>
      <Row
        elevation="medium"
        fill
        direction={setResponsive('column', 'column', 'row')}
        margin={{ bottom: 'medium' }}
        pad={{
          horizontal: setResponsive('small', 'medium'),
          vertical: 'xsmall'
        }}
      >
        <Table>
          <TableHeader style={{ fontSize: setResponsive('16px', '18px') }}>
            <TableRow>
              <TableCell />
              <TableCell>Samples</TableCell>
              <TableCell>Experiments</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody style={{ fontSize: setResponsive('16px', '18px') }}>
            {Object.keys(organismSamples).map((organism) => (
              <TableRow key={organism}>
                <TableCell>{formatString(organism)}</TableCell>
                <TableCell>
                  <Text color="brand">
                    {formatNumbers(organismSamples[organism].length)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text color="brand">
                    {formatNumbers(experimentCountByOrganism[organism])}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
            <TotalRow dataset={dataset} />
          </TableBody>
        </Table>
      </Row>
    </Box>
  )
}

export default DatasetSummary
