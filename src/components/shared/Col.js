import { useResponsive } from 'hooks/useResponsive'
import { Box } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  ${({ flexValue }) => css`
    flex: ${flexValue};
  `}

  ${({ viewport }) =>
    viewport === 'small' &&
    css`
      flex: 1 1 auto;
      + div {
        margin-top: 16px;
      }
    `}
`

export const Col = ({ flexValue = '1 1 0', children, ...props }) => {
  const { viewport } = useResponsive()
  return (
    <Wrapper
      flexValue={flexValue}
      viewport={viewport}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </Wrapper>
  )
}

export default Col
