import { RadioButtonGroup } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FormElements}RadioButtonGroup`,
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
Default.storyName = 'RadioButtonGroup'
