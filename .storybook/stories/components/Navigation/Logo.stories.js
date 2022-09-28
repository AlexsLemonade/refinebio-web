import { Logo } from 'components/header/Logo'
import title from '../../../utils/titles'

export default {
  title: `${title.Navigation}Logo`,
  component: Logo,
  args: {
    light: false
  }
}

const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.storyName = 'Logo'
