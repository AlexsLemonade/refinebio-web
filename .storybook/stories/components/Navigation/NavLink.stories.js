import { NavLink } from 'components/header/NavLink'
import title from '../../../utils/titles'

export default {
  title: `${title.Navigation}Link`,
  component: NavLink,
  args: {
    children: 'Search',
    light: false
  }
}

const Template = (args) => <NavLink {...args}>{args.children}</NavLink>

export const Default = Template.bind({})
Default.storyName = 'Link'
