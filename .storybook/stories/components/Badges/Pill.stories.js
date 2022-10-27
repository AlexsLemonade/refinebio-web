import { Pill } from 'components/shared/Pill'
import title from 'utils/titles'

export default {
  title: `${title.Badges}Process Info`,
  component: Pill,
  argTypes: {
    background: {
      control: 'color'
    },
    color: {
      control: 'color'
    },
    label: {
      control: 'text'
    },
    status: {
      control: 'select',
      options: ['success', 'info', 'warning', null]
    }
  },
  args: {
    background: '',
    color: '',
    label: 'refinebio processed',
    dot: true,
    status: 'success'
  }
}

const Template = (args) => <Pill {...args} />

export const Defalt = Template.bind({})
Defalt.storyName = 'Process Info'
