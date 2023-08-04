import { Text } from 'grommet'

export const TextCapitalized = ({ text }) => (
  <Text size="inherit" style={{ textTransform: 'capitalize' }}>
    {text}
  </Text>
)

export default TextCapitalized
