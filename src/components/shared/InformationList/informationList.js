import { BoxBlock } from 'components/shared/BoxBlock'
import styled, { css } from 'styled-components'

export const InformationList = styled(BoxBlock)`
  ${({ theme }) => css`
    > div:nth-of-type(odd) {
      background: ${theme.global.colors['gray-shade-5']};
    }
  `}
`

export default InformationList
