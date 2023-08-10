import { Box } from 'grommet'
import styled, { css } from 'styled-components'

export const ViewBlocks = styled(Box)`
  ${({ theme }) => css`
    > div {
      border-bottom: solid 1px ${theme.global.colors['gray-shade-40']};
      margin-bottom: 16px;
      padding-bottom: 16px;
    }
    > div:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  `}
`

export default ViewBlocks
