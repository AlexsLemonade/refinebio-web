import { Box } from 'grommet'

export const List = ({
  alignItems = 'center',
  display = 'flex',
  flexDirection = 'row',
  fontWeight = 'normal',
  listStyle = 'none',
  listType = 'ul',
  maxWidth = 'auto',
  width = '100%',
  children,
  ...props
}) => {
  return (
    <Box
      as={listType}
      style={{
        alignItems,
        display,
        flexDirection,
        fontWeight,
        listStyle,
        maxWidth,
        width
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Box>
  )
}

export default List
