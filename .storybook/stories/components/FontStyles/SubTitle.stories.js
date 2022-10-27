import { Heading } from 'grommet'
import title from 'utils/titles'

export default {
  title: `${title.FontStyles}SubTitle`,
  component: Heading,
  args: {
    children: 'Sub Title - 28px'
  }
}

const Templete = (args) => (
  <Heading level={2} size="large">
    {args.children}
  </Heading>
)

export const SubTitle = Templete.bind({})
