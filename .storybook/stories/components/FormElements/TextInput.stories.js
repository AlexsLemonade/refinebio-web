import { TextInput } from 'components/shared/TextInput'
import { InlineMessage } from 'components/shared/InlineMessage'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('TextInput'),
  component: TextInput,
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
        <InlineMessage label="Error Message" labelOnly color="error" />
      )}
      <TextInput {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.storyName = 'TextInput'
