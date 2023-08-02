import { Fragment } from 'react'
import { nanoid } from 'nanoid'
import isArray from 'helpers/isArray'
import { useTextHighlight } from 'hooks/useTextHighlight'
import { Text } from 'grommet'

// Hightlight portions of a text based on a matched value(a string or an array of string)
// (resource) https://stackoverflow.com/a/43235785/763705
export const TextHighlighted = ({ text }) => {
  const match = useTextHighlight()

  if (!match) {
    return text
  }

  const matchText = isArray(match) ? match.filter((x) => x).join('|') : match

  const matchRegex = new RegExp(`(${matchText})`, 'gi') // ignore case

  // split on matched term and include term into parts
  const parts = text.split(matchRegex).map((part) => ({ part, id: nanoid() }))

  return parts.map(({ part, id }) =>
    matchRegex.test(part) ? (
      <Text key={id} style={{ background: '#FFFBC9', verticalAlign: 'unset' }}>
        {part}
      </Text>
    ) : (
      <Fragment key={id}>{part}</Fragment>
    )
  )
}
