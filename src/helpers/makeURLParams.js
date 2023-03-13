import { isArray } from './isArray'

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
