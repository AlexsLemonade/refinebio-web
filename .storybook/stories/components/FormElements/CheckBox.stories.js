import { CheckBox } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FormElements}Checkbox`,
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
