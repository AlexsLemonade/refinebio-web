import { CheckBox } from 'grommet'

export default {
  title: 'Form Elements/Checkbox',
  component: CheckBox,
  args: {
    checked: true,
    disabled: false,
    label: 'Label'
  }
}

const Template = (args) => <CheckBox {...args} />

export const Default = Template.bind({})
Default.storyName = 'Checkbox'
