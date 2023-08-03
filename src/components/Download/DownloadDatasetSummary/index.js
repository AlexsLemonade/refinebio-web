import { useResponsive } from 'hooks/useResponsive'
import {
  getExperimentCountBySpecies,
  getTotalExperiments,
  getTotalSamples
} from 'helpers/dataset'

import {
  Box,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from 'grommet'
import { Row } from 'components/shared/Row'
import { RowSpieces, RowTotal } from './rows'

export const DownloadDatasetSummary = ({ dataset }) => {
  const { setResponsive } = useResponsive()
  const samplesBySpecies = dataset.organism_samples
  const totalSamples = getTotalSamples(dataset.data)
  const totalExperiments = getTotalExperiments(dataset.data)
  const experimentCountBySpecies = getExperimentCountBySpecies(
    dataset.data,
    dataset.experiments
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
            <RowSpieces
              samplesBySpecies={samplesBySpecies}
              experimentCountBySpecies={experimentCountBySpecies}
            />
            <RowTotal totals={[totalSamples, totalExperiments]} />
          </TableBody>
        </Table>
      </Row>
    </Box>
  )
}

export default DownloadDatasetSummary
