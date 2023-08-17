import { Header } from 'components/Header'

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    color: {
      control: 'select',
      options: ['success', 'info', 'error']
    }
  },
  args: {
    light: false
  }
}

const Template = (args) => <Header {...args} />

export const Defalt = Template.bind({})
Defalt.storyName = 'Header'
