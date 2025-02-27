import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import { RadioButtonGroup } from 'components/RadioButtonGroup'

export const DatasetSamplesExperimentsOrganismFilter = ({
  dataset,
  defaultOption,
  organism,
  setOrganism
}) => {
  const { setResponsive } = useResponsive()

  // dynamic radio options based on the user's selection
  const radioOptions = [
    defaultOption,
    ...Object.keys(dataset.organism_samples).map((organismName) => ({
      label: formatString(organismName),
      value: organismName
    }))
  ]

  return (
    <Box
      direction="row"
      margin={{ bottom: 'small', horizontal: setResponsive('none', 'small') }}
    >
      <Text margin={{ right: 'small' }}>Show</Text>
      <RadioButtonGroup
        direction="row"
        options={radioOptions}
        name="organism-filter"
        value={organism}
        onChange={(e) => setOrganism(e.target.value)}
      />
    </Box>
  )
}

export default DatasetSamplesExperimentsOrganismFilter
