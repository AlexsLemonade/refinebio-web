import { IconBadge } from 'components/shared/IconBadge'

export default {
  title: 'Badges/IconBadge',
  component: IconBadge,
  argTypes: {
    name: {
      control: 'select',
      options: [
        'Accession',
        'Help',
        'Organism',
        'MicroArray',
        'MixedPlatform',
        'Rna',
        'Samples'
      ]
    },
    label: {
      control: 'text'
    }
  },
  args: {
    label: '',
    name: 'Accession'
  }
}

const Template = (args) => <IconBadge {...args} />

export const Default = Template.bind({})
Default.storyName = 'Icon Badge'
