import { Text, Anchor } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FontStyles}Hyperlink`,
  component: Anchor,
  argTypes: {
    weight: {
      control: 'select',
      options: ['normal', 'bold']
    }
  },
  args: {
    children: 'Lato Body Link - 16px',
    weight: 'normal'
  }
}

const Template = (args) => (
  <Text weight={args.weight}>
    <Anchor>{args.children}</Anchor>
  </Text>
)

export const Hyperlink = Template.bind({})
