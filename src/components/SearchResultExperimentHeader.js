import { Box } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'

/* TEMPORARY ====== */
const data = [
  { id: 1, name: 'Organism', label: 'Homo sapiens' },
  { id: 2, name: 'Samples', label: '23 Downloadable Samples' },
  { id: 3, name: 'MicroArray', label: 'Affymetrix-335' }
]
/* ================ */

export const SearchResultExperimentHeader = () => {
  return (
    <Box
      align="center"
      border={[
        {
          color: 'gray-shade-40',
          side: 'top'
        },
        {
          color: 'gray-shade-40',
          side: 'bottom'
        }
      ]}
      direction="row"
      pad={{ vertical: 'xsmall' }}
    >
      {data.map((d) => (
        <Box key={d.id} flex="grow">
          <IconBadge label={d.label} name={d.name} />
        </Box>
      ))}
    </Box>
  )
}

export default SearchResultExperimentHeader
