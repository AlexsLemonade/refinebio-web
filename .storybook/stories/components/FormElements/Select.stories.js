import { Select } from 'grommet'
import title from '../../../utils/titles'

export default {
  title: `${title.FormElements}Select`,
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
