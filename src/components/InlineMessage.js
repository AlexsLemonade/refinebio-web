import { Box, Paragraph } from 'grommet'
import { Icon } from 'components/Icon'

// supported types: 'error', 'info', 'success'
const types = {
  error: {
    icon: 'Warning', // icon namne
    color: 'error', // icon color
    fontColor: 'error' // label font color
  },
  info: {
    icon: 'Info',
    color: 'info',
    fontColor: 'black'
  },
  success: {
    icon: 'Success',
    color: 'success',
    fontColor: 'success'
  }
}

export const InlineMessage = ({
  type = 'info',
  label = '',
  labelOnly = false,
  align = 'center',
  color = '',
  fontColor = '',
  fontSize = 'small',
  height = '24px',
  iconSize = 'medium',
  ...props
}) => (
  <Box
    align={align}
    direction="row"
    height={height}
    width="max-content"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    {!labelOnly && (
      <Box margin={{ right: 'xxsmall' }} height={height}>
        <Icon
          color={color || types[type].color}
          name={types[type].icon}
          size={iconSize}
        />
      </Box>
    )}
    <Paragraph color={fontColor || types[type].fontColor} size={fontSize}>
      {label}
    </Paragraph>
  </Box>
)

export default InlineMessage
