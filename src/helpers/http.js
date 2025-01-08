import makeURLParams from 'helpers/makeURLParams'
import fetchAsync from 'helpers/fetchAsync'

// Helper methods for API requests
export default {
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
  put: (url, body = {}, headers = {}) =>
    fetchAsync(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    }),
  post: (url, body = {}, headers = {}) =>
    fetchAsync(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
}
