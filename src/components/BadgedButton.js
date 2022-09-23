import { Box, Button as GrommetButton } from 'grommet'
import { NumberBadge } from 'components/NumberBadge'

export const BadgedButton = ({ count = 0, light = false, ...props }) => {
  return (
    <Box style={{ position: 'relative' }}>
      <NumberBadge light={light} count={count} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetButton secondary className={light ? 'light' : ''} {...props} />
    </Box>
  )
}

export default BadgedButton
