import { InlineMessage } from 'components/shared/InlineMessage'

export default {
  title: 'Components/Shared/InlineMessage',
  component: InlineMessage
}

export const Success = () => (
  <InlineMessage label="Added to Dataset" status="success" />
)
export const Info = () => (
  <InlineMessage label="Platform not supported" status="info" />
)
export const Error = () => (
  <InlineMessage label="Encountered an error" status="error" />
)
export const LabelOnly = () => (
  <InlineMessage label="Error message with no icon" LabelOnly status="error" />
)

LabelOnly.storyName = 'Label Only'
