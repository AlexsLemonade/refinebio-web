import { Button } from 'components/shared/Button'
import title from '../../../utils/titles'

export default {
  title: `${title.Buttons}Button`,
  component: Button,
  argTypes: {
    count: { control: 'text' },
    onClick: { action: 'clicked!' }
  },
  args: {
    label: 'Button',
    light: false
  }
}

const types = [
  { primary: true },
  { secondary: true },
  { badged: true, count: '0' }
]

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  ...types[0]
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...types[1]
}

export const Badged = Template.bind({})
Badged.args = {
  ...types[2]
}
Badged.storyName = 'Badged'
