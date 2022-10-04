import { Box } from 'grommet'
import { IconBadge } from 'components/shared/IconBadge'
import data from 'api/data'

export const SearchCardMeta = () => {
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
      {data.SearchCardMeta.map((d) => (
        <Box key={d.id} flex="grow">
          <IconBadge label={d.label} name={d.name} />
        </Box>
      ))}
    </Box>
  )
}

export default SearchCardMeta
