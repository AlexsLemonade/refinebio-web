import { RadioButton } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FormElements}RadioButton`,
  component: RadioButton,
  args: {
    checked: true,
    disabled: false,
    label: 'Label'
  }
}

const Template = (args) => <RadioButton {...args} />

export const Default = Template.bind({})
Default.storyName = 'RadioButton'
