import { Box } from 'grommet'

export const List = ({
  alignItems = 'center',
  display = 'flex',
  flexDirection = 'row',
  listType = 'ul',
  children
}) => {
  return (
    <Box as={listType} style={{ alignItems, display, flexDirection }}>
      {children}
    </Box>
  )
}

export default List
