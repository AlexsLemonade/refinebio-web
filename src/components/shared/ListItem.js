import { Text } from 'grommet'

export const ListItem = ({ children, margin = '0 0 16px', ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Text as="li" style={{ margin }} {...props}>
    {children}
  </Text>
)

export default ListItem
