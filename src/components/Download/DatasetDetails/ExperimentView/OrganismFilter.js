import { Box, Text } from 'grommet'
import { useResponsive } from 'hooks/useResponsive'
import formatString from 'helpers/formatString'
import unionizeArrays from 'helpers/unionizeArrays'
import { RadioButtonGroup } from 'components/shared/RadioButtonGroup'

export const OrganismFilter = ({
  dataset,
  defaultOption,
  organism,
  setOrganism
}) => {
  const { setResponsive } = useResponsive()

  // merges all of the organism_names arrays into a single
  // one-dimensional array containing only unique elements
  const uniqueOrganisms = unionizeArrays(
    ...dataset.experiments
      .map((experiment) => experiment.organism_names)
      .reduce((accumulator, organisms) => accumulator.concat(organisms), [])
  )

  if (typeof uniqueOrganisms === 'string' || uniqueOrganisms.length <= 1) {
    return null
  }

  // dynamic radio options based on the user's selection
  const radioOptions = [
    { label: defaultOption.label, value: defaultOption.value },
    ...uniqueOrganisms.map((uniqueOrganism) => ({
      label: formatString(uniqueOrganism),
      value: uniqueOrganism
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

export default OrganismFilter
