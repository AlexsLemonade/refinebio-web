import { Heading } from 'grommet'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('Heading'),
  component: Heading,
  argTypes: {
    level: {
      control: 'select',
      options: ['1', '2', '3', '4', '5']
    }
  },
  args: {
    children: 'Heading',
    level: '1'
  }
}

const size = ['- 26px', '- 22px', '- 20px', '- 18px', '- 16px']

const Template = (args) => (
  <Heading {...args}>
    {args.children} {size[args.level - 1]}
  </Heading>
)

export const Defalt = Template.bind({})
Defalt.storyName = 'Heading'
