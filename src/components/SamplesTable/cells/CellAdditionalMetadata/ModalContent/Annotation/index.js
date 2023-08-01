import { Fragment } from 'react'
import { nanoid } from 'nanoid'
import fromPairs from 'helpers/fromPairs'
import isArray from 'helpers/isArray'
import isObject from 'helpers/isObject'
import { Box } from 'grommet'
import { AnnotationText } from './AnnotationText'
import { AnnotationValue } from './AnnotationValue'

export const Annotation = ({ value }) => {
  if (isArray(value) && value.length === 1) {
    return <AnnotationText value={value[0]} />
  }

  const valueIsObject = isArray(value) || !isObject(value)

  // check if it's an array with objects(key/values) with only two keys
  // and one of them is 'value'
  if (
    isArray(value) &&
    value.length > 0 &&
    value.every((v) => Object.keys(v).length === 2 && !!v.value)
  ) {
    const valueAsObject = fromPairs(
      value.map((v) => {
        const keyName = Object.keys(v).find((key) => key !== 'value')

        return [v[keyName], v.value]
      })
    )

    return <AnnotationValue value={valueAsObject} />
  }

  return (
    <Box>
      {valueIsObject ? (
        <AnnotationValue value={value} />
      ) : (
        Object.keys(value).map((key) => (
          <Fragment key={nanoid()}>
            <strong>
              <AnnotationText value={key} />
            </strong>
            <AnnotationValue value={value[key]} />
          </Fragment>
        ))
      )}
    </Box>
  )
}

export default Annotation
