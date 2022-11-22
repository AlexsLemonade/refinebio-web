import { Box, Paragraph } from 'grommet'
import { Icon } from 'components/shared/Icon'

// status: error, info, success

export const InlineMessage = ({
  color = 'info',
  height = '24px',
  label = '',
  labelOnly = false,

  ...props
}) => {
  const SVG =
    color === 'error'
      ? 'Warning'
      : `${color.substring(0, 1).toUpperCase()}${color.substring(1)}`

  return (
    <Box
      align="center"
      direction="row"
      height={height}
      width="max-content"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {!labelOnly && (
        <Box margin={{ right: 'xsmall' }} height="inherit">
          <Icon
            color={color === 'error' ? 'coral-shade-20' : color}
            name={SVG}
          />
        </Box>
      )}
      <Paragraph color={color} size="small">
        {label}
      </Paragraph>
    </Box>
  )
}
