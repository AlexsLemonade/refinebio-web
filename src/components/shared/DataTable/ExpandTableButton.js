import { Button } from 'components/Button'
import { Icon } from 'components/Icon'

export const ExpandTableButton = ({ tableExpanded, setTableExpanded }) => {
  return (
    <Button
      icon={
        <Icon
          color="brand"
          name={tableExpanded ? 'Collapse' : 'Expand'}
          size="16px"
        />
      }
      gap="xsmall"
      label={tableExpanded ? 'Collaspe Table' : 'Expand Table'}
      style={{ fontWeight: 700, paddingRight: 0 }}
      onClick={() => setTableExpanded(!tableExpanded)}
    />
  )
}

export default ExpandTableButton
