import { Box, Paragraph } from 'grommet'
import styled, { css } from 'styled-components'
import InfoIcon from '../images/info.svg'
import SuccessIcon from '../images/success.svg'
import ErrorIcon from '../images/warning.svg'

// status: error, info, success

const SVGs = {
  InfoIcon,
  SuccessIcon,
  ErrorIcon
}

const P = styled(Paragraph)`
  ${({ theme }) => css`
    color: ${(props) => theme.global.colors[props.status]};
  `}
`

export const InlineMessage = ({
  label = '',
  labelOnly = false,
  status = 'info',
  ...props
}) => {
  const SVGIcon =
    SVGs[`${status.substring(0, 1).toUpperCase()}${status.substring(1)}Icon`]

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" align="center" width="max-content" {...props}>
      {!labelOnly && (
        <Box margin={{ right: '8px' }}>
          <SVGIcon role="presentation" aria-hidden="true" focusable="false" />
        </Box>
      )}
      <P status={status} size="small">
        {label}
      </P>
    </Box>
  )
}
