import { readableAttributes, readableBooleans, readableValues } from 'config'
// Returns the human-readable format of the given attributeKey and an optional attributeValue
// attributeValue can be either a boolean or an object containing values associated with attributeKey
export default (attributeKey, attributeValue = null) => {
  if (typeof attributeValue === 'boolean') {
    return readableBooleans[attributeKey]
      ? readableBooleans[attributeKey][attributeValue ? 0 : 1]
      : attributeValue
  }

  return (
    attributeValue?.[attributeKey] ||
    readableAttributes[attributeKey] ||
    readableValues[attributeKey] ||
    attributeKey
  )
}
