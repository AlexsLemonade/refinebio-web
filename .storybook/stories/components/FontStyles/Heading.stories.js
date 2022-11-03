import { Heading } from 'grommet'
import { getTitle } from 'utils/getTitle'
import { useThemeContext } from 'utils/useThemeContext'

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

const Template = (args) => {
  const theme = useThemeContext()
  const fontSize = theme.heading.level[args.level].medium.size
  return (
    <Heading {...args}>
      {args.children === 'Heading'
        ? `${args.children} - ${fontSize}`
        : args.children}
    </Heading>
  )
}

export const Defalt = Template.bind({})
Defalt.storyName = 'Heading'
