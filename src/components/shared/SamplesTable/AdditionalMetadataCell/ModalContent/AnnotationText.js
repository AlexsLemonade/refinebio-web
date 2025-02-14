import { Text } from 'grommet'
import isString from 'helpers/isString'
import isValidURL from 'helpers/isValidURL'
import { Anchor } from 'components/Anchor'
import { TextHighlight } from 'components/TextHighlight'

export const AnnotationText = ({ value }) => {
  if (isString(value)) {
    if (isValidURL(value)) {
      return (
        <Anchor
          href={value}
          label={value}
          rel="nofollow noopener noreferrer"
          target="_blank"
        />
      )
    }

    return <TextHighlight>{value}</TextHighlight>
  }

  return <Text as="code">{JSON.stringify(value)}</Text>
}

export default AnnotationText
