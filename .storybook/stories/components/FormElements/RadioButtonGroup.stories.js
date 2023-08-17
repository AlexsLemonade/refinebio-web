import { RadioButtonGroup } from 'grommet'

export default {
  title: 'Form Elements/RadioButtonGroup',
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
