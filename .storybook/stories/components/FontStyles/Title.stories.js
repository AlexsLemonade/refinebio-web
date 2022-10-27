import { Heading } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FontStyles}Title`,
  component: Heading,
  args: {
    children: 'Title - 32px'
  }
}

const Template = (args) => (
  <Heading level={1} size="large">
    {args.children}
  </Heading>
)

export const Title = Template.bind({})
