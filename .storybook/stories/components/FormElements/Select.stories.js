import { Select } from 'grommet'

export default {
  title: 'Form Elements/Select',
  component: Select,
  args: {
    defaultValue: 'Mene Option',
    disabled: false,
    options: ['Mene Option', 'Mene Option 1', 'Mene Option 2', 'Mene Option 3']
  }
}

const Template = (args) => <Select {...args} />

export const Default = Template.bind({})
Default.storyName = 'Select'
