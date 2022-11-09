import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  flex-direction: row;
  border: dashed lime 1px;
  ${({ viewport }) =>
    viewport === 'small' &&
    css`
      flex-direction: column;
    `}
`

export const Row = ({ viewport, children, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper viewport={viewport} {...props}>
      {children}
    </Wrapper>
  )
}

export default Row
