import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  width: fit-content;
  border: dashed tomato 1px;
  ${({ viewport }) =>
    viewport === 'small' &&
    css`
      margin: 16px 0;
    `}
  ${({ viewport }) =>
    viewport === 'medium' &&
    css`
      margin: 0 32px;
    `}
    ${({ viewport }) =>
    viewport === 'large' &&
    css`
      margin: 0 56px;
    `}
`

export const Col = ({ children, ...props }) => {
  const { viewport } = useResponsive()
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper viewport={viewport} {...props}>
      {children}
    </Wrapper>
  )
}

export default Col
