import { Box } from 'grommet'
import styled, { css } from 'styled-components'

export const SamplesTableEmpty = styled(Box)`
  align-items: center;
  justify-content: center;
  padding-top: 32px;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  ${({ background }) =>
    css`
      background: ${background};
    `};
`

export default SamplesTableEmpty
