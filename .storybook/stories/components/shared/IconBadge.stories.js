import { IconBadge } from 'components/shared/IconBadge'

export default {
  title: 'Components/Shared/IconBadge',
  component: IconBadge
}

export const Accession = () => <IconBadge label="" name="Accession" />
export const Help = () => <IconBadge label="" name="Help" />
export const Organism = () => <IconBadge label="" name="Organism" />
export const MicroArray = () => <IconBadge label="" name="MicroArray" />
export const MixedPlatform = () => <IconBadge label="" name="MixedPlatform" />
export const Rna = () => <IconBadge label="" name="Rna" />
export const Samples = () => <IconBadge label="" name="Samples" />
export const WithLabel = () => <IconBadge label="Label Text" name="Help" />

WithLabel.storyName = 'With Lable'
