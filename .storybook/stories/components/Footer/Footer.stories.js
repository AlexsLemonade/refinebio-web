import { Footer } from 'components/Footer'
import { getTitle } from 'utils/getTitle'

export default {
  title: getTitle('Footer'),
  component: Footer
}

const Template = () => <Footer />

export const Defalt = Template.bind({})
Defalt.storyName = 'Footer'
