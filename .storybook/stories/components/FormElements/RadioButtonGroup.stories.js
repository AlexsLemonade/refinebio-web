import { RadioButtonGroup } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FormElements}RadioButtons/Group`,
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

export const RadioGroup = Template.bind({})
RadioGroup.storyName = 'Group'
