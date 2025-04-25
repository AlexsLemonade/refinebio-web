import { InlineMessage } from 'components/shared/InlineMessage'

export default {
  title: 'InlineMessage',
  component: InlineMessage,
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'info', 'error']
    }
  },
  args: {
    label: 'Added to Dataset',
    labelOnly: false,
    color: 'success' || alternatievColor
  }
}

const Template = (args) => <InlineMessage {...args} />

export const Defalt = Template.bind({})
Defalt.storyName = 'Inline Message'
