import { isArray } from './isArray'

// TODO: add support or create helper for parameters that may have multiple values .e.g. ) platform=VALUE&platform=VVALUE&platform...
// Returns the url query parameters for API calls based on the given object 'params'
export const makeURLParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (isArray(value)) {
        return `${encodeURIComponent(key)}=${value
          .map(encodeURIComponent)
          .join('&')}`
      }

      return [key, value].map(encodeURIComponent).join('=')
    })
    .join('&')
}
