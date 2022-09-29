import { Box, Button as GrommetButton } from 'grommet'

/* NOTE: 
- Set the prop 'light' to true for the dark background
*/

export const Button = ({ badge, link = false, light = false, ...props }) => {
  return (
    <Box width="max-content">
      <GrommetButton
        badge={badge}
        secondary={!!badge}
        // eslint-disable-next-line no-nested-ternary
        className={light ? 'light' : link ? 'link' : ''}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Box>
  )
}

export default Button
