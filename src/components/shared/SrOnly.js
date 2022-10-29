import { Text } from 'grommet'
import styled from 'styled-components'

const Wrapper = styled(Text)`
  // https://webaim.org/techniques/css/invisiblecontent/
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`

export const SrOnly = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
