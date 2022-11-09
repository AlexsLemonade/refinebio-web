import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  flex: 1 1 0;

  ${({ marginSide, viewport }) =>
    viewport === 'small' &&
    css`
      margin: 16px ${marginSide};
    `}
  ${({ marginSide, viewport }) =>
    viewport === 'medium' &&
    css`
      margin: 0 ${marginSide};
    `}
    ${({ marginSide, viewport }) =>
    viewport === 'large' &&
    css`
      margin: 0 ${marginSide};
    `}
`

export const Col = ({ marginSide = '0', children, ...props }) => {
  const { viewport } = useResponsive()
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Wrapper marginSide={marginSide} viewport={viewport} {...props}>
      {children}
    </Wrapper>
  )
}

export default Col
