import { Box, Paragraph, Text } from 'grommet'
import InfoIcon from '../../images/info.svg'
import SuccessIcon from '../../images/success.svg'
import ErrorIcon from '../../images/warning.svg'

// status: error, info, success
const SVGs = {
  InfoIcon,
  SuccessIcon,
  ErrorIcon
}

export const InlineMessage = ({
  label = '',
  labelOnly = false,
  color = 'info',
  ...props
}) => {
  const SVGIcon =
    SVGs[`${color.substring(0, 1).toUpperCase()}${color.substring(1)}Icon`]
  const HEIGHT = '24px'

  return (
    <Box
      align="center"
      direction="row"
      height={HEIGHT}
      width="max-content"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {!labelOnly && (
        <Box margin={{ right: 'xsmall' }} height="inherit">
          <Text
            color={color === 'error' ? 'coral-shade-20' : color}
            height={HEIGHT}
          >
            <SVGIcon role="presentation" aria-hidden="true" focusable="false" />
          </Text>
        </Box>
      )}
      <Paragraph color={color} size="small">
        {label}
      </Paragraph>
    </Box>
  )
}
