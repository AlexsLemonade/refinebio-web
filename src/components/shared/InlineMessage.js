import { Box, Paragraph, Text } from 'grommet'
import styled, { css } from 'styled-components'
import InfoIcon from '../../images/info.svg'
import SuccessIcon from '../../images/success.svg'
import ErrorIcon from '../../images/warning.svg'

// status: error, info, success
const SVGs = {
  InfoIcon,
  SuccessIcon,
  ErrorIcon
}

const P = styled(Paragraph)`
  ${({ theme }) => css`
    color: ${(props) => theme.global.colors[props.color]};
  `}
`

export const InlineMessage = ({
  label = '',
  labelOnly = false,
  color = 'info',
  ...props
}) => {
  const SVGIcon =
    SVGs[`${color.substring(0, 1).toUpperCase()}${color.substring(1)}Icon`]
  const errorIconColor = 'coral-shade-20'

  return (
    <Box
      align="center"
      direction="row"
      height="24px"
      width="max-content"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {!labelOnly && (
        <Box margin={{ right: '8px' }} height="inherit">
          <Text
            color={color === 'error' ? errorIconColor : color}
            height="24px"
          >
            <SVGIcon role="presentation" aria-hidden="true" focusable="false" />
          </Text>
        </Box>
      )}
      <P color={color} size="small">
        {label}
      </P>
    </Box>
  )
}
