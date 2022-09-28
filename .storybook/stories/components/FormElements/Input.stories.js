import { Input } from 'components/shared/Input'
import { InlineMessage } from 'components/shared/InlineMessage'
import title from '../../../utils/titles'

export default {
  title: `${title.FormElements}TextInput`,
  component: Input,
  argTypes: {
    value: { control: 'text' }
  },
  args: {
    error: false,
    placeholder: 'Enter email',
    value: ''
  }
}

const Template = (args) => {
  return (
    <>
      {args.error && (
        <InlineMessage label="Error Message" labelOnly status="error" />
      )}
      <Input {...args} />
    </>
  )
}

export const TextInput = Template.bind({})
TextInput.storyName = 'Text Input'
