import { NavDropDown } from 'components/Header/NavDropDown'
import title from 'utils/titles'

export default {
  title: `${title.Navigation}DropDown`,
  component: NavDropDown,
  args: {
    label: 'Search',
    light: false,
    items: [
      { label: 'Menu Item 1', onClick: () => {} },
      { label: 'Menu Item 2', onClick: () => {} }
    ]
  }
}

const Template = (args) => <NavDropDown {...args} />

export const Default = Template.bind({})
Default.storyName = 'DropDown'
