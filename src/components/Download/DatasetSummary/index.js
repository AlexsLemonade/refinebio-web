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

// returns the count of expriment by spcecies
const getExperimentCountBySpecies = (data, experiments) => {
  if (!data || !experiments) return {}

  const species = {}

  for (const accessionCode of Object.keys(data)) {
    const experimentInfo = experiments[accessionCode]

    if (!experimentInfo) return {}

    const { organism_names: organismNames } = experimentInfo

    for (const organism of organismNames) {
      if (!species[organism]) species[organism] = 0
      species[organism] += 1
    }
  }

  return species
}

export const DatasetSummary = ({ dataset }) => {
  const {
    data: datasetData,
    experiments,
    organism_samples: organismSamples
  } = dataset
  const { getTotalExperiments, getTotalSamples } = useDatasetManager()
  const { setResponsive } = useResponsive()
  const totalSamples = getTotalSamples(datasetData)
  const totalExperiments = getTotalExperiments(datasetData)
  const experimentCountBySpecies = getExperimentCountBySpecies(
    datasetData,
    experiments
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
              samplesBySpecies={organismSamples}
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
