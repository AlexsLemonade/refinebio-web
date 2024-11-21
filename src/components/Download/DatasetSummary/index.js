import {
  Box,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from 'grommet'
import { useDatasetManager } from 'hooks/useDatasetManager'
import { useResponsive } from 'hooks/useResponsive'
import { Row } from 'components/shared/Row'
import { SpiecesRow } from './SpeciesRow'
import { TotalRow } from './TotalRow'

// returns the experiment count per organism
const getExperimentCountByOrganisms = (data, experiments) => {
  if (!data || !experiments) return {}

  const experimentCounts = {}

  for (const accessionCode of Object.keys(data)) {
    const experiment = experiments.find(
      (e) => e.accession_code === accessionCode
    )

    if (!experiment) return {}

    const { organism_names: organismNames } = experiment

    for (const organism of organismNames) {
      if (!experimentCounts[organism]) experimentCounts[organism] = 0
      experimentCounts[organism] += 1
    }
  }

  return experimentCounts
}

export const DatasetSummary = ({ dataset }) => {
  const { getTotalExperiments, getTotalSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const totalSamples = getTotalSamples(dataset.data)
  const totalExperiments = getTotalExperiments(dataset.data)
  const experimentCountBySpecies = getExperimentCountByOrganisms(
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
            <SpiecesRow
              samplesBySpecies={dataset.organism_samples}
              experimentCountBySpecies={experimentCountBySpecies}
            />
            <TotalRow totals={[totalSamples, totalExperiments]} />
          </TableBody>
        </Table>
      </Row>
    </Box>
  )
}

export default DatasetSummary
