import { Box } from 'grommet'

export const List = ({
  alignItems = 'center',
  display = 'flex',
  flexDirection = 'row',
  listType = 'ul',
  children,
  ...props
}) => {
  return (
    <Box
      as={listType}
      style={{ alignItems, display, flexDirection }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default List
