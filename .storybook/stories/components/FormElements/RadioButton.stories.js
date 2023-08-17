import { RadioButton } from 'grommet'

export default {
  title: 'Form Elements/RadioButton',
  component: RadioButton,
  args: {
    checked: true,
    disabled: false,
    label: 'Label',
    name: 'radio'
  }
}

const Template = (args) => <RadioButton {...args} />

export const Default = Template.bind({})
Default.storyName = 'RadioButton'
