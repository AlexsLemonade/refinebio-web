import { Input } from 'components/shared/Input'
import { InlineMessage } from 'components/shared/InlineMessage'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('Input'),
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
        <InlineMessage label="Error Message" labelOnly color="error" />
      )}
      <Input {...args} />
    </>
  )
}

export const Default = Template.bind({})
Default.storyName = 'Input'
