import { Box, Button as GrommetButton } from 'grommet'

/* NOTE: 
- Set the prop 'light' to true for the dark background
*/

export const Button = ({ badge, light = false, ...props }) => {
  return (
    <Box width="max-content">
      <GrommetButton
        badge={badge}
        secondary={!!badge}
        className={light ? 'light' : ''}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Box>
  )
}

export default Button
