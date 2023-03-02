import { isString } from 'helpers/isString'
import { isValidURL } from 'helpers/isValidURL'
import { Text } from 'grommet'
import { Anchor } from 'components/shared/Anchor'
import { TextHighlighted } from 'components/shared/TextHighlighted'

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

    return <TextHighlighted text={value} />
  }

  return <Text as="code">{JSON.stringify(value)}</Text>
}

export default AnnotationText
