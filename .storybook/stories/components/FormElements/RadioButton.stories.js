import { RadioButton } from 'grommet'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('RadioButton'),
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
