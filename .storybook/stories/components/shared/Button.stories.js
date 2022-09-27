import { Button } from 'components/shared/Button'

export default {
  title: 'Components/Shared/Button',
  component: Button
}

export const Primary = () => <Button primary label="Primary" />
export const Seconday = () => <Button primary label="Secondary" />
export const BadgedButton = () => <Button badged label="Badged Button" />
BadgedButton.storyName = 'Badged Button'
