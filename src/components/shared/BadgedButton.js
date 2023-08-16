import abbreviateNumber from 'helpers/abbreviateNumber'
import { BoxBlock } from 'components/shared/BoxBlock'
import { Button } from 'components/shared/Button'
import { NumberBadge } from 'components/shared/NumberBadge'

export const BadgedButton = ({ count = 0, light = false, ...props }) => {
  return (
    <BoxBlock>
      <NumberBadge light={light} count={abbreviateNumber(count)} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button light={light} {...props} />
    </BoxBlock>
  )
}

export default BadgedButton
