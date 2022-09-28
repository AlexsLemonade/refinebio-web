import { InlineMessage } from 'components/shared/InlineMessage'
import title from '../../../utils/titles'

export default {
  title: `${title.InlineMessages}Inline Message`,
  component: InlineMessage,
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'info', 'error']
    }
  },
  args: {
    label: 'Added to Dataset',
    labelOnly: false,
    status: 'success'
  }
}

const Template = (args) => <InlineMessage {...args} />

export const Defalt = Template.bind({})
Defalt.storyName = 'Inline Message'
