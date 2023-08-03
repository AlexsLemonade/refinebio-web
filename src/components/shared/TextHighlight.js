import { Fragment } from 'react'
import { nanoid } from 'nanoid'
import isArray from 'helpers/isArray'
import { useTextHighlight } from 'hooks/useTextHighlight'
import { Text } from 'grommet'

// Highlight parts of a 'text' based on a 'highlight' value(a string or an array of string)
// (resource) https://stackoverflow.com/a/43235785/763705
const Highlighter = ({ text, highlight }) => {
  const highlightText = isArray(highlight)
    ? highlight.filter((x) => x).join('|')
    : highlight

  if (!highlightText) return text

  const highlightRegex = new RegExp(`(${highlightText})`, 'gi') // ignore case
  // split on highlight term and include term into parts
  const parts = text
    .split(highlightRegex)
    .map((part) => ({ part, id: nanoid() }))

  return parts.map(({ part, id }) =>
    highlightRegex.test(part) ? (
      <Text
        key={id}
        size="inherit"
        style={{
          background: '#FFFBC9',
          lineHeight: 'inherit',
          verticalAlign: 'unset'
        }}
      >
        {part}
      </Text>
    ) : (
      <Fragment key={id}>{part}</Fragment>
    )
  )
}

export const TextHighlight = ({ children }) => {
  const match = useTextHighlight()

  if (!match) {
    return children
  }

  return <Highlighter text={children} highlight={match} />
}
