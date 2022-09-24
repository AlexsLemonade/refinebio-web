import { Box, Button as GrommetButton } from 'grommet'
import { NumberBadge } from 'components/NumberBadge'

export const Button = ({
  badged = false,
  count = 0,
  light = false,
  ...props
}) => {
  return (
    <Box style={{ position: 'relative' }}>
      {badged && <NumberBadge light={light} count={count} />}

      <GrommetButton
        secondary={badged}
        className={light ? 'light' : ''}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Box>
  )
}

export default Button
