import { Text } from 'grommet'
// https://webaim.org/techniques/css/invisiblecontent/

export const SrOnly = ({ label = '' }) => {
  return (
    <Text
      style={{
        clip: 'rect(1px, 1px, 1px, 1px)',
        clipPath: ' inset(50%)',
        height: '1px',
        width: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 'none',
        position: 'absolute'
      }}
    >
      {label}
    </Text>
  )
}
