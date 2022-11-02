import { CheckBox } from 'grommet'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('Checkbox'),
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
