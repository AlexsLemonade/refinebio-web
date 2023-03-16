import { makeURLParams } from 'helpers/makeURLParams'
import { fetchAsync } from 'helpers/fetchAsync'

// Helper methods for API requests
export const http = {
  get: (url, params = false, headers = false) => {
    const formattedUrl = params ? `${url}?${makeURLParams(params)}` : url

    return !headers
      ? fetchAsync(formattedUrl)
      : fetchAsync(formattedUrl, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            ...headers
          }
        })
  },
  put: (url, params = {}, headers = {}) =>
    fetchAsync(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        ...headers
      },
      body: JSON.stringify(params)
    }),
  post: (url, params = {}) =>
    fetchAsync(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(params)
    })
}
