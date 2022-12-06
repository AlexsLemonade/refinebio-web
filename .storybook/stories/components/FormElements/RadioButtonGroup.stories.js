import { RadioButtonGroup } from 'grommet'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('RadioButtonGroup'),
  component: RadioButtonGroup,
  argTypes: {
    name: { control: 'text' }
  },
  args: {
    disabled: false,
    name: 'radio',
    options: ['Option 1', 'Option 2']
  }
}

const Template = (args) => <RadioButtonGroup {...args} />

export const Default = Template.bind({})
Default.storyName = 'RadioButton Group'
