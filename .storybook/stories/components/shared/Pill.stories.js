import { Pill } from 'components/shared/Pill'

export default {
  title: 'Components/Shared/Pill',
  component: Pill
}

export const Success = () => (
  <Pill label="refinebio processed" status="success" />
)
export const Info = () => (
  <Pill label="Quantile normailzation skipped" status="info" />
)

export const Warning = () => (
  <Pill label="Submitter processed" status="warning" />
)

export const Custom = () => <Pill label="Custom colored Pill" />

export const LabelOnly = () => <Pill label="Label only Pill" status="info" />

LabelOnly.storyName = 'Label Only'
