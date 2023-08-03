import { Text } from 'grommet'

export const TextRequired = ({ text = 'required' }) => (
  <Text color="coral-shade-20">
    <i>({text})</i>
  </Text>
)

export default TextRequired
