import { Box } from 'grommet'
import styled, { css } from 'styled-components'
import abbreviateNumbers from 'helpers/abbreviateNumbers'
import { BoxBlock } from 'components/shared/BoxBlock'
import { Button } from 'components/shared/Button'

const Badge = styled(Box)`
  align-item: center;
  border-radius: 24px;
  display: flex;
  font-size: 12px;
  min-width: max-content;
  padding: 3px 12px;
  position: absolute;
  top: -16px;
  right: -16px;
  text-align: center;
  z-index: 1;
  ${({ theme, light }) => css`
    background: ${light
      ? theme.global.colors.white
      : theme.global.colors.brand};
    color: ${light ? theme.global.colors.brand : theme.global.colors.white};
  `}
`

export const BadgedButton = ({ count = 0, light = false, ...props }) => {
  return (
    <BoxBlock>
      <Badge light={light}>{abbreviateNumbers(count)}</Badge>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button light={light} {...props} />
    </BoxBlock>
  )
}

export default BadgedButton
