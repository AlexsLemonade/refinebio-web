import { Box, Menu as GrommetMenu } from 'grommet'
import styled, { css } from 'styled-components'

const Wrapper = styled(Box)`
  font-family: 'Rubik', sans-serif;
  ${({ theme }) => css`
    button:first-child {
      color: ${theme.global.colors.black};
      padding: 4px 8px;
      svg {
        fill: ${theme.global.colors.black};
        stroke: ${theme.global.colors.black};
      }
      &:hover,
      &[aria-expanded='true'] {
        color: ${theme.global.colors.brand};
        svg {
          fill: ${theme.global.colors.brand};
          stroke: ${theme.global.colors.brand};
        }
      }
    }
  `}
`

export const DropDown = ({ label, items, ...props }) => {
  return (
    <Wrapper>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <GrommetMenu label={label} items={items} {...props} />
    </Wrapper>
  )
}

export default DropDown
