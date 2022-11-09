import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  ${({ flexValue }) => css`
    flex: ${flexValue};
  `}

  ${({ marginSide, viewport }) =>
    viewport === 'small' &&
    css`
      flex: 1 1 auto;
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

export const Col = ({
  flexValue = '1 1 0',
  marginSide = '0',
  children,
  ...props
}) => {
  const { viewport } = useResponsive()
  return (
    <Wrapper
      flexValue={flexValue}
      marginSide={marginSide}
      viewport={viewport}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Wrapper>
  )
}

export default Col
