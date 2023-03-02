import { nanoid } from 'nanoid'
import { isArray } from 'helpers/isArray'
import { isObject } from 'helpers/isObject'
import { isString } from 'helpers/isString'
import { Box, Text } from 'grommet'
import { AnnotationText } from './AnnotationText'

export const AnnotationValue = ({ value }) => {
  if (isString(value)) {
    return <AnnotationText value={value} />
  }

  if (isArray(value)) {
    return value.map((v, i) => (
      <Box
        key={nanoid()}
        direction="row"
        margin={{ top: i ? 'xsmall' : 'none' }}
      >
        <AnnotationText value={v} />
      </Box>
    ))
  }

  if (isObject(value)) {
    if (Object.keys(value).length === 2 && !!value.value) {
      const keyName = Object.keys(value).find((key) => key !== 'value')
      return (
        <>
          <AnnotationText value={value[keyName]} />
          {': '}
          <AnnotationText value={value.value} />
        </>
      )
    }

    return Object.keys(value).map((key) => (
      <Box key={key} direction="row">
        <AnnotationText value={key} />
        <AnnotationText value={value[key]} />
      </Box>
    ))
  }

  return <Text as="code">{JSON.stringify(value)}</Text>
}

export default AnnotationValue
