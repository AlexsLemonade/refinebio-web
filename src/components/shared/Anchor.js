import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

const CustomAnchor = styled(GrommetAnchor)`
  ${({ icon, underline }) => css`
    &:hover,
    &:focus {
      text-decoration: ${icon || underline ? 'underline' : 'none'};
    }
  `}
  ${({ icon }) =>
    icon &&
    css`
      padding: 0;
    `}
`

export const Anchor = ({ icon, underline = true, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CustomAnchor icon={icon} underline={underline} {...props} />
}

export default Anchor
