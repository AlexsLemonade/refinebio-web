import { Box, Paragraph } from 'grommet'
import styled, { css } from 'styled-components'
import Info from '../images/info.svg'
import Success from '../images/success.svg'
import Warning from '../images/warning.svg'

const SVGs = {
  Info,
  Success,
  Warning
}

const P = styled(Paragraph)`
  ${({ theme }) => css`
    color: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props.name === 'Success'
        ? theme.global.colors['pastel-green']
        : props.name === 'Info'
        ? theme.global.colors['alex-navy']
        : theme.global.colors.coral};
  `}
`

export const InlineMessage = ({ label = '', name = 'Info', ...props }) => {
  const SVGIcon = SVGs[name]

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box direction="row" align="center" width="max-content" {...props}>
      <Box margin={{ right: '8px' }}>
        <SVGIcon role="presentation" aria-hidden="true" focusable="false" />
      </Box>
      <P name={name} size="small">
        {label}
      </P>
    </Box>
  )
}
