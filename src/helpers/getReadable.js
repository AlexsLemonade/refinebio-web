import { readableAttributes, readableBooleans, readableValues } from 'config'
// Returns the human-readable format of the given key or value
export default (key, value = '') => {
  if (typeof value === 'boolean') {
    return readableBooleans[key] ? readableBooleans[key][value ? 0 : 1] : value
  }
  return readableAttributes[key] || readableValues[value] || value || key
}
