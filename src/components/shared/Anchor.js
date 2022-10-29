import { Anchor as GrommetAnchor } from 'grommet'
import styled, { css } from 'styled-components'

const CustomAnchor = styled(GrommetAnchor)`
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  ${({ noUnderline }) =>
    noUnderline &&
    css`
      &:hover,
      &:focus {
        text-decoration: none;
      }
    `}
`

export const Anchor = ({ ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CustomAnchor {...props} />
}

export default Anchor
